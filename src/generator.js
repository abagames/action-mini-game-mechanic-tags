const baseUrl = "https://abagames.github.io/action-mini-game-mechanic-tags/";
const gameUrlsFileName = "./src/game_urls.csv";
const gamesFileName = "./src/games.csv";
const tagsFileName = "./src/tags";
const categoriesFileName = "./src/categories";
const outputDirectory = "./docs/";

const langs = ["", "_ja"];

/** @type { Object.<string, {imageUrl: string, linkUrl: string}> } */
let gameUrls;
/** @type { Object.<string, {description: string}> } */
let categories;
/** @type { {tag: string, category: string, typicalGame: string, overview: string, description: string}[]} */
let tagList;
let existsTags;
/** @type { {game: string, tags: {category: string, tag: string}[]}[] } */
let gameList;
let lang;

loadGameUrlsList();
langs.forEach((l) => {
  lang = l;
  loadCategories();
  loadTagList();
  loadGameList();
  saveIndexPage();
  saveTagPages();
});

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
  const categoryList = loadCsv(`${categoriesFileName}${lang}.csv`, [
    "category",
    "description",
  ]);
  categories = {};
  categoryList.forEach((c) => {
    categories[c.category] = { description: c.description };
  });
}

function loadTagList() {
  // @ts-ignore
  tagList = loadCsv(`${tagsFileName}${lang}.csv`, [
    "tag",
    "typicalGame",
    "overview",
    "description",
  ]);
  existsTags = {};
  tagList.forEach((t) => {
    existsTags[t.tag] = true;
    const tc = t.tag.split(":");
    t.category = tc[0];
    t.tag = tc[1];
  });
}

function loadGameList() {
  const fs = require("fs");
  const listCsv = fs.readFileSync(gamesFileName, "utf8");
  const list = listCsv.split("\r\n");
  list.shift();
  list.pop();
  // @ts-ignore
  gameList = list.map((l) => {
    const items = parseCsvToArray(l);
    const item = { game: items[0] };
    const tags = [];
    for (let i = 1; i < items.length; i++) {
      if (!existsTags[items[i]]) {
        throw `Unknown tag [${items[i]}]`;
      }
      const ct = items[i].split(":");
      tags.push({ category: ct[0], tag: ct[1] });
    }
    item.tags = tags;
    return item;
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
    const items = parseCsvToArray(l);
    const item = {};
    properties.forEach((p, i) => {
      item[p] = items[i];
    });
    return item;
  });
  return itemList;
}

function saveIndexPage() {
  const fileName = `${outputDirectory}index${lang}.html`;
  const fs = require("fs");
  /**
   * @type {{
   *  title: string, imageUrl: string, description: string,
   *  linkUrl: string, anchorName:string, linkType: string, isCard: boolean
   * }[]}
   */
  const list = [];
  let category = undefined;
  tagList.forEach((t) => {
    if (t.category !== category) {
      category = t.category;
      list.push({
        title: category,
        imageUrl: undefined,
        description: categories[category].description,
        linkUrl: undefined,
        anchorName: undefined,
        linkType: undefined,
        isCard: false,
      });
    }
    console.log(`${t.category}: ${t.tag} / ${t.typicalGame}`);
    const urls = gameUrls[t.typicalGame];
    const anchorName = replaceSpaceWidthUnderscore(t.category + "_" + t.tag);
    list.push({
      title: t.tag,
      imageUrl: urls.imageUrl,
      description: t.overview,
      linkUrl: `./${anchorName}${lang}.html`,
      anchorName: anchorName,
      linkType: "Detail",
      isCard: true,
    });
  });
  const pageHtml = getPage(list, "", categories["top"].description, true);
  fs.writeFileSync(fileName, pageHtml);
}

function saveTagPages() {
  tagList.forEach((t) => {
    console.log(`${t.category}: ${t.tag}`);
    saveTagPage(t.category, t.tag, t.overview, t.description);
  });
}

function saveTagPage(category, tag, overview, description) {
  const fileName = `${outputDirectory}${replaceSpaceWidthUnderscore(
    category + "_" + tag
  )}${lang}.html`;
  const fs = require("fs");
  /**
   * @type {{
   *  title: string, imageUrl: string, description: string,
   *  linkUrl: string, anchorName:string, linkType: string, isCard: boolean
   * }[]}
   */
  const list = [];
  gameList.forEach((g) => {
    let hasTag = false;
    g.tags.forEach((t) => {
      if (t.category === category && t.tag === tag) {
        hasTag = true;
      }
    });
    if (!hasTag) {
      return;
    }
    const urls = gameUrls[g.game];
    const description = g.tags
      .map(
        (t) => `
      <a class="btn btn-secondary btn-sm my-1" href="./${replaceSpaceWidthUnderscore(
        t.category + "_" + t.tag
      )}${lang}.html">
      ${t.category}: ${t.tag}
      </a>
    `
      )
      .join("");
    list.push({
      title: g.game,
      imageUrl: urls.imageUrl,
      description: description,
      linkUrl: urls.linkUrl,
      anchorName: undefined,
      linkType: "Play",
      isCard: true,
    });
  });
  const pageHtml = getPage(
    list,
    `${category}: ${tag}`,
    `${overview} ${description}`,
    false
  );
  fs.writeFileSync(fileName, pageHtml);
}

/**
 * @param {{
 *  title: string, imageUrl: string, description: string,
 *  linkUrl: string, anchorName:string, linkType: string, isCard: boolean
 * }[]} list
 * @param {string} tag
 * @param {string} description
 * @param {boolean} hasTwitterCard
 * @return {string}
 */
function getPage(list, tag, description, hasTwitterCard) {
  const cardHtml = getCards(list);
  const h1 = tag.length === 0 ? "action-mini-game mechanic tags" : tag;
  const title =
    "action-mini-game mechanic tags" + (tag.length === 0 ? "" : ` - ${tag}`);
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${
      hasTwitterCard
        ? `<meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${baseUrl}twitter_card_image.png" />`
        : ""
    }
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
            href="./index${lang}.html"
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
            <h1 class="fw-light">${h1}</h1>
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
 *  title: string, imageUrl: string, description: string,
 *  linkUrl: string, anchorName: string, linkType: string, isCard: boolean
 * }[]} list
 * @return {string}
 */
function getCards(list) {
  return list
    .map((g) =>
      g.isCard
        ? getCard(
            g.title,
            g.imageUrl,
            g.linkUrl,
            g.anchorName,
            g.linkType,
            g.description
          )
        : getSeparator(g.title, g.description)
    )
    .join("");
}

/**
 * @param {string} title
 * @param {string} imageUrl
 * @param {string} linkUrl
 * @param {string} anchorName
 * @param {string} linkType
 * @param {string} description
 * @return {string}
 */
function getCard(title, imageUrl, linkUrl, anchorName, linkType, description) {
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
      ${anchorName != null ? `<a name="${anchorName}">` : ""}
      <h5 class-"card-title">${title}</h5>
      ${anchorName != null ? "</a>" : ""}
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
  const anchor = replaceSpaceWidthUnderscore(title);
  return `
<div class="col-md-12">
  <div class="card shadow-sm">
    <div class="card-body">
      <h4 class="card-title">
        <a name="${anchor}" href="#${anchor}" class="text-decoration-none">
          ${title}
        </a>
      </h4>
      <p class="card-text">${description}</p>
    </div>
  </div>
</div>
`;
}

/**
 * @param {string} str
 * @returns {string}
 */
function replaceSpaceWidthUnderscore(str) {
  return str.replace(/\s/g, "_");
}

/**
 * @param {string} str
 * @returns {string[]}
 */
function parseCsvToArray(str) {
  let a = [];
  let i = 0;
  for (;;) {
    const isQuoted = str.charAt(i) === '"';
    let ni = str.indexOf(isQuoted ? `"` : ",", isQuoted ? i + 1 : i);
    if (ni < 0) {
      if (!isQuoted) {
        a.push(str.substring(i));
      }
      break;
    }
    a.push(str.substring(isQuoted ? i + 1 : i, ni));
    i = ni + (isQuoted ? 2 : 1);
  }
  return a;
}
