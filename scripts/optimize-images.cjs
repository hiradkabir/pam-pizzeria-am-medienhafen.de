const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const imageDirectory = path.resolve(__dirname, '..', 'assets', 'images');
const sources = [
  'holzofen-pizzeria-duesseldorf-medienhafen.jpg',
  'holzofen-pizzeria-duesseldorf-medienhafen-mobil.jpg',
  'pizzabaecker-holzofen-duesseldorf.jpg',
  'pizza-calzone-medienhafen.jpg',
  'pizzeria-am-medienhafen-duesseldorf.jpg',
  'holzofenpizza-frisch-gebacken-duesseldorf.jpg',
  'italienisches-restaurant-medienhafen-atmosphaere.jpg',
  'holzpalette-restaurant-medienhafen.jpg',
  'restaurant-medienhafen-detail.jpg',
  'terrasse-pizzeria-medienhafen.jpg',
  'italienischer-salat-nicoise-duesseldorf.jpg',
  'restaurant-medienhafen-aussen-terrasse.jpg',
  'terrasse-sitzplaetze-pizzeria-medienhafen.jpg',
  'spaghetti-basilikum-pasta-duesseldorf.jpg',
  'rucola-tomaten-salat-parmesan.jpg',
  'caprese-tomate-mozzarella-basilikum.jpg'
];

async function optimize() {
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const sourceName of sources) {
    const inputPath = path.join(imageDirectory, sourceName);
    const outputPath = inputPath.replace(/\.jpg$/i, '.webp');

    if (!fs.existsSync(inputPath)) {
      throw new Error(`Missing image source: ${inputPath}`);
    }

    const sourceSize = fs.statSync(inputPath).size;
    const output = await sharp(inputPath)
      .rotate()
      .webp({
        quality: 78,
        effort: 6,
        smartSubsample: true
      })
      .toFile(outputPath);

    sourceBytes += sourceSize;
    outputBytes += output.size;
    console.log(`${sourceName} -> ${path.basename(outputPath)} (${sourceSize} -> ${output.size} bytes)`);
  }

  const saving = sourceBytes ? Math.round((1 - outputBytes / sourceBytes) * 100) : 0;
  console.log(`Optimized ${sources.length} images: ${sourceBytes} -> ${outputBytes} bytes (${saving}% smaller).`);
}

optimize().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
