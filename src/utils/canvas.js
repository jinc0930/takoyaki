const Canvas = require("@napi-rs/canvas");
const path = require("path");

Canvas.GlobalFonts.registerFromPath(
  path.join(__dirname, "..", "..", "assets", "Oswald-Bold.ttf"),
  "Oswald Bold"
);
function getLines(ctx, text, maxWidth, maxLines = Infinity) {
  const words = text.split(" ", 256);
  let lines = [],
    currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
    if (currentLine === maxLines - 1) break;
  }
  lines.push(currentLine);
  return lines;
}

/**
 * changeMyMind
 * @param {string} avatar
 * @param {string} text
 * @returns {Promise<Buffer>}
 * @example const img = await changeMyMind(avatar, text);
 * await require("fs/promises").writeFile("./out.png", img);
 */
async function changeMyMind(avatar, text) {
  const width = 482,
    height = 361;
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const baseImage = await Canvas.loadImage(
    path.join(__dirname, "..", "..", "assets", "change_my_mind.jpg")
  );
  ctx.drawImage(baseImage, 0, 0, width, height);

  const avatarImage = await Canvas.loadImage(avatar);
  ctx.drawImage(avatarImage, 160, 30, 70, 70);

  const fontSize = 24;
  ctx.font = `${fontSize}px Oswald Bold`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6;
  ctx.lineJoin = "round";
  ctx.fillStyle = "white";
  const lines = getLines(ctx, text, 200);
  if (lines.length === 1) {
    ctx.translate(220, 275);
  } else {
    ctx.translate(220, 250);
  }
  ctx.rotate(-0.1);
  getLines(ctx, text, 200).forEach((line, i) => {
    ctx.strokeText(line, 0, i * fontSize * 1.1);
    ctx.fillText(line, 0, i * fontSize * 1.1);
  });
  const buffer = canvas.toBuffer("image/png");
  return buffer;
}

module.exports = { changeMyMind };
