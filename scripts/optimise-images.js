const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "../assets/images");
const BACKUP = path.join(__dirname, "../assets/originals");

if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP, { recursive: true });

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);

  // skip UI icons/logos
  if (name.includes("icon") || name.includes("logo") || name.includes("favicon")) return;

  const backupPath = path.join(BACKUP, name);
  if (!fs.existsSync(backupPath)) fs.copyFileSync(filePath, backupPath);

  const tempOutput = filePath + ".tmp";

  const image = sharp(filePath);
  const metadata = await image.metadata();

  const resized = image.resize({
    width: metadata.width > metadata.height ? 1920 : null,
    height: metadata.height >= metadata.width ? 1920 : null,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    const newPath = filePath.replace(".png", ".jpg");
    await resized.jpeg({ quality: 82 }).toFile(tempOutput);
    fs.renameSync(tempOutput, newPath);
    fs.unlinkSync(filePath);
    console.log("Converted:", name, "→ JPG");
  } else {
    await resized.jpeg({ quality: 82 }).toFile(tempOutput);
    fs.renameSync(tempOutput, filePath);
    console.log("Compressed:", name);
  }
}

async function run() {
  const files = fs.readdirSync(SRC);
  for (const file of files) {
    const full = path.join(SRC, file);
    if (fs.statSync(full).isFile()) {
      await processFile(full);
    }
  }
  console.log("\nDONE — images optimized");
}

run();