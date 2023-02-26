# Conceive new action mini-games by combining multiple tags with ChatGPT

Through [this prompt](#prompt) on [ChatGPT](https://openai.com/blog/chatgpt/), it is possible to instruct [the game mechanics tags](https://github.com/abagames/action-mini-game-mechanic-tags/blob/main/src/tags.csv) and solicit the generation of new games. For instance, the response from ChatGPT might include games such as the ones listed below.

---

Game 1: Scaffold Jump
Selected tags: player: scaffold, on pressed: jump

Description: In this game, the player controls a character that moves along scaffolds. The character constantly moves forward, and the player can make the character jump by pressing the button. The objective is to avoid falling off the scaffolds or hitting obstacles while collecting coins or power-ups. The game gets progressively faster and more difficult as the player advances.

Game 2: Pinball Panic
Selected tags: player: circle, weapon: bounce, field: pins, on pressed: shoot

Description: In this game, the player controls a circular character that bounces around a pinball-like field. The player can shoot projectiles by pressing the button, which bounce off the pins and destroy enemies. The objective is to survive as long as possible while racking up points by destroying enemies and collecting power-ups.

Game 3: Springy Strings
Selected tags: player: string, player: bounce, field: gravity, on pressed: jump

Description: In this game, the player controls a spring-like character that bounces around a zero-gravity field. The character can jump by pressing the button, which sends it bouncing higher into the air. The objective is to avoid obstacles and enemies while collecting power-ups and reaching the end of the level.

Game 4: Wipeout Warriors
Selected tags: player: bar, field: water, obstacle: chase, weapon: wipe, on pressed: jump

Description: In this game, the player controls a bar-shaped character that races through a water course filled with obstacles and enemies. The character automatically moves forward, and the player can make the character jump by pressing the button. The character can also use a wiping weapon to clear the way of obstacles and enemies. The objective is to reach the end of the course in the shortest time possible.

Game 5: Color Conundrum
Selected tags: rule: match, rule: time limit, field: roughness, on pressed: turn

Description: In this game, the player controls a character that must navigate a rough terrain while matching colors. The character automatically moves forward, and the player can turn left or right by pressing the button. The objective is to match as many colors as possible before the time runs out, while avoiding obstacles and enemies on the way.

---

## Prompt

```
I want you to act as a game designer. Remember the following tags related to game mechanics. The tags are written in a format of 'Category: Name, "Description"', with one line for each tag. Randomly combine those tags and come up with a new game that contains only the game mechanics corresponding to that tag. Make that game an action mini-game that utilizes only a single button. The maximum number of tags that may be combined is 5. Describe what kind of game it is and the selected tags. Try to devise 5 different games without using the same game mechanic tags as much as possible.

player: rotate, "The player character rotates."
player: reciprocate, "The player character reciprocates horizontally or vertically."
player: reflect, "The player character reflects upon colliding with a wall or object."
player: bounce, "The player character is constantly bouncing."
player: automatic, "The player character moves automatically without requiring input."
player: string, "The player character has the shape of a string or spring."
player: bar, "The player character  has a rod-shaped form."
player: circle, "The player character has a circular shape."
player: multiple, "There exist multiple player characters within the game."
player: follow, "To follow the player character."
player: inverted, "The player character exists in a reversed state."
player: limited vision, "The player's vision is limited."
player: scaffold, "The player character moves along the scaffolds or terrain."
player: step on, "The player character can stomp on enemies."
player: paint, "Painting the terrain."
weapon: artillery, "The object follows a parabolic trajectory due to the effect of gravity."
weapon: chase, "Tracking enemies."
weapon: vertical, "The projectile is fired in a direction that the player character is not facing, such as vertically."
weapon: reflect, "Reflected by walls."
weapon: auto aiming, "The projectiles are automatically aimed at the direction of the enemy and fired."
weapon: explosion, "Initiate an explosion."
weapon: blow off, "Propel the character away."
weapon: wipe, "Mow down the enemy."
weapon: arc, "The weapon has an arched shape."
weapon: ray, "The line indicating the direction of fire is displayed."
weapon: smoke, "The effect of smoke that obstructs the line of sight can be observed."
weapon: time limit, "It detonates after a set period of time."
weapon: disablement, "Disable the enemy upon impact."
weapon: interference, "Interfere with enemy attacks."
weapon: change field, "Alter the terrain."
obstacle: fall, "Descend from a height."
obstacle: chase, "Pursue the player character."
obstacle: bounce, "Continuously leaping."
obstacle: split, "Splitting occurs."
obstacle: stack, "Stacking occurs."
obstacle: foresee, "Anticipate the movements of the player character."
obstacle: well up, "Characters are spawning."
obstacle: penalty, "There are objects interspersed that incur penalties upon contact or destruction."
field: floors, "Multiple platforms are suspended in the air."
field: holes, "There are holes in the ground."
field: bottomless, "When the character falls off the bottom of the screen, the game is over."
field: roughness, "The terrain is uneven."
field: spike, "There are terrains in the game that result in game over upon contact."
field: outpost, "There are points in the game where reaching an enemy or an item leads to a game over."
field: lanes, "The character moves on multiple lanes."
field: pins, "Multiple pins are arranged in various configurations."
field: rotate, "The field is in a state of rotation."
field: press, "The terrain is capable of crushing the character."
field: gravity, "Gravity and attraction forces are at work."
field: space, "The cosmos serves as a field."
field: water, "The surface and the depths of water serve as the field."
field: weather, "Weather and wind are relevant factors."
field: connected, "Multiple objects are interconnected."
field: regenerate, "The terrain undergoes regeneration."
field: 1D, "The field is confined to one dimension."
field: 3D, "An expansive three-dimensional view with depth."
field: multiple, "Multiple fields are displayed simultaneously."
rule: match, "Matching colors, numbers, and shapes."
rule: find, "Distinguishing the target object."
rule: classify, "Classifying characters."
rule: surround, "Enclosing with characters."
rule: shelter, "Hiding behind cover."
rule: pass through gap, "Passing through gaps."
rule: balance, "Achieving equilibrium."
rule: mathematics, "The subject matter pertains to mathematics and numerical elements."
rule: physics, "Incorporate the principles of physics."
rule: geometry, "Incorporate the principles of geometry."
rule: time limit, "Depletion of time and resources leads to the game's termination."
rule: control weapons, "Manipulate weapons."
rule: proximity bonus, "Proximity to risk yields points."
rule: time manipulation, "The flow of time undergoes alterations."
rule: chain, "An occurrence ensues from a cascading effect."
rule: friendly fire, "Even allies can be hit by weapons."
on pressed: turn, "Change direction."
on pressed: jump, "Perform a jump."
on pressed: flap, "Accelerate upwards by flapping wings."
on pressed: reverse state, "Invert attributes or states."
on pressed: shoot, "Fire a projectile."
on pressed: pierce, "Pierce through in a group."
on pressed: split, "Divide into multiple parts."
on pressed: select route, "To determine the route of advancement."
on pressed: go forward, "Propel forward in the intended direction."
on pressed: jump into another, "Leap to the next waypoint. Teleport instantly."
on pressed: fall, "Drop down, fall."
on pressed: change field, "Alter the field."
on pressed: attack, "Attack by extending the weapon or otherwise."
on holding: adjust angle, "Adjust the direction and distance."
on holding: rotate, "Rotate."
on holding: thrust, "Accelerate forward or upward with the player character."
on holding: move, "Movement."
on holding: stop, "Halt."
on holding: shoot, "Fire a projectile."
on holding: extend, "Extend and expand an object."
on holding: charge, "Charge energy."
on holding: inhale, "Inhale."
on holding: defend, "Entering a defensive stance."
on holding: defenseless, "The defense diminishes and weakens."
on holding: reverse state, "Invert attributes and statuses."
on holding: avoid, "Capable of evading enemies and projectiles or traversing through them."
on released: throw, "Throw or move forward."
on released: erase, "Erase or nullify characters within a specified range."
on got item: reverse state, "Invert attributes, status, and direction."
on got item: power up, "Upgrade and gain power."
on got item: spawn, "Spawn a character."
```
