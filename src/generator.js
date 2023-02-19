const baseUrl = "https://abagames.github.io/action-mini-game-mechanic-tags/";
const tagsFileName = "./src/tags_ja.csv";
const gamesFileName = "./src/games.csv";
const gameUrlsFileName = "./src/game_urls.csv";
const categoriesFileName = "./src/categories_ja.csv";
const outputDirectory = "./docs/";

/** @type { Object.<string, {imageUrl: string, linkUrl: string}> } */
let gameUrls;
/** @type { Object.<string, {description: string}> } */
let categories;
/** @type { {tag: string, category: string, typicalGame: string, overview: string, description: string}[]} */
let gameList;

loadGameUrlsList();
loadCategories();
loadGamesList();
saveIndexPage();

function loadGameUrlsList() {
  /** @type { {title: string, imageUrl: string, linkUrl: string, linkType: string, platformName: string}[]} */
  // @ts-ignore
  const gameUrlList = loadCsv(gameUrlsFileName, [
    "title",
    "imageUrl",
    "linkUrl",
    "linkType",
    "platformName",
  ]);
  gameUrls = {};
  gameUrlList.forEach((g) => {
    gameUrls[g.title] = { imageUrl: g.imageUrl, linkUrl: g.linkUrl };
  });
}

function loadCategories() {
  /** @type { {category: string, description: string}[]} */
  // @ts-ignore
  const categoryList = loadCsv(categoriesFileName, ["category", "description"]);
  categories = {};
  categoryList.forEach((c) => {
    categories[c.category] = { description: c.description };
  });
}

function loadGamesList() {
  // @ts-ignore
  gameList = loadCsv(tagsFileName, [
    "tag",
    "typicalGame",
    "overview",
    "description",
  ]);
  gameList.forEach((g) => {
    const tc = g.tag.split(":");
    g.category = tc[0];
    g.tag = tc[1];
  });
}

function loadCsv(fileName, properties) {
  const fs = require("fs");
  const listCsv = fs.readFileSync(fileName, "utf8");
  const list = listCsv.split("\r\n");
  list.shift();
  list.pop();
  // @ts-ignore
  const itemList = list.map((l) => {
    const items = l.split(",");
    const item = {};
    properties.forEach((p, i) => {
      item[p] = items[i];
    });
    return item;
  });
  return itemList;
}

function saveIndexPage() {
  const fileName = `${outputDirectory}index.html`;
  const fs = require("fs");
  /**
   * @type {{
   *  title: string, imageUrl: string, description: string, linkUrl: string, linkType: string,
   *  isCard: boolean
   * }[]}
   */
  const list = [];
  let category = undefined;
  gameList.forEach((g) => {
    if (g.category !== category) {
      category = g.category;
      list.push({
        title: category,
        imageUrl: undefined,
        description: categories[category].description,
        linkUrl: undefined,
        linkType: undefined,
        isCard: false,
      });
    }
    console.log(`${g.category} : ${g.tag} / ${g.typicalGame}`);
    const urls = gameUrls[g.typicalGame];
    list.push({
      title: g.tag,
      imageUrl: urls.imageUrl,
      description: g.overview,
      linkUrl: undefined,
      linkType: "Detail",
      isCard: true,
    });
  });
  const pageHtml = getPage(list, "", categories["top"].description);
  fs.writeFileSync(fileName, pageHtml);
}

/**
 * @param {{
 *  title: string, imageUrl: string, description: string, linkUrl: string, linkType: string,
 *  isCard: boolean
 * }[]} list
 * @param {string} tag
 * @param {string} description
 * @return {string}
 */
function getPage(list, tag, description) {
  const cardHtml = getCards(list);
  let title = "action-mini-game mechanic tags";
  if (tag.length > 0) {
    title += `- ${tag}`;
  }
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${baseUrl}twitter_image.png" />
    <title>${title}</title>
    <link href="favicon.png" rel="icon" />

    <link
      href="./bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
      crossorigin="anonymous"
    />
    <link href="./dark_mode.css" rel="stylesheet" />

    <meta name="theme-color" content="#7952b3" />

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a
            href="${baseUrl}"
            class="navbar-brand d-flex align-items-center"
          >
            <strong>action-mini-game mechanic tags</strong>
          </a>
        </div>
      </div>
    </header>

    <main>
      <section class="py-3 text-center container">
        <div class="row py-lg-3">
          <div class="col-lg-9 col-md-8 mx-auto">
            <h1 class="fw-light">${title}</h1>
            <p class="lead text-muted">
              ${description}
            </p>
          </div>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            ${cardHtml}
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
`;
}

/**
 * @param {{
 *  title: string, imageUrl: string, description: string, linkUrl: string, linkType: string,
 *  isCard: boolean
 * }[]} list
 * @return {string}
 */
function getCards(list) {
  return list
    .map((g) =>
      g.isCard
        ? getCard(g.title, g.imageUrl, g.linkUrl, g.linkType, g.description)
        : getSeparator(g.title, g.description)
    )
    .join("");
}

/**
 * @param {string} title
 * @param {string} imageUrl
 * @param {string} linkUrl
 * @param {string} linkType
 * @param {string} description
 * @return {string}
 */
function getCard(title, imageUrl, linkUrl, linkType, description) {
  const buttonHtml =
    linkUrl === "undefined"
      ? `
          <a
            href="${linkUrl}"
            class="btn btn-secondary disabled my-2"
            >No Detail</a
          >
      `
      : `
          <a
            href="${linkUrl}"
            class="btn btn-primary my-2"
            >${linkType}</a
          >
`;
  const imgHtml =
    imageUrl === "undefined"
      ? `
<svg
  class="bd-placeholder-img card-img-top"
  width="100%"
  height="225"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Placeholder: Thumbnail"
  preserveAspectRatio="xMidYMid slice"
  focusable="false"
>
  <title>Placeholder</title>
  <rect width="100%" height="100%" fill="#55595c"></rect>
  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
    No image
  </text>
</svg>
`
      : `
<img
  src="${imageUrl}"
  alt="${title}"
  class="bd-placeholder-img card-img-top"
  height="225"
  style="object-fit: contain"
  loading="lazy"
/>
`;
  return `
<div class="col">
  <div class="card shadow-sm">
    ${imgHtml}
    <div class="card-body">
      <h5 class-"card-title">${title}</h5>
      <p class="card-text">${description}</p>
      ${buttonHtml}
    </div>
  </div>
</div>
`;
}

/**
 * @param {string} title
 * @param {string} description
 * @return {string}
 */
function getSeparator(title, description) {
  return `
<div class="col-md-12">
  <div class="card shadow-sm">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${description}</p>
    </div>
  </div>
</div>
`;
}
