const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = path.resolve(__dirname, '../public/STMS Logo.png');
const outputDir = path.resolve(__dirname, '../public/icons');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  console.log('Generating PWA icons from:', inputFile);

  for (const size of sizes) {
    const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputFile)
      .resize(size, size, { fit: 'contain', background: { r: 246, g: 103, b: 19, alpha: 1 } })
      .png()
      .toFile(outputFile);
    console.log(`✓ Generated ${size}x${size} icon`);
  }

  // Also generate apple-touch-icon (180x180)
  const appleIcon = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(inputFile)
    .resize(180, 180, { fit: 'contain', background: { r: 246, g: 103, b: 19, alpha: 1 } })
    .png()
    .toFile(appleIcon);
  console.log('✓ Generated apple-touch-icon (180x180)');

  // favicon 32x32
  const favicon = path.resolve(__dirname, '../public/favicon.png');
  await sharp(inputFile)
    .resize(32, 32, { fit: 'contain', background: { r: 246, g: 103, b: 19, alpha: 1 } })
    .png()
    .toFile(favicon);
  console.log('✓ Generated favicon.png (32x32)');

  // maskable icon - with more padding for safe zone
  const maskable = path.join(outputDir, 'icon-512x512-maskable.png');
  await sharp(inputFile)
    .resize(384, 384, { fit: 'contain', background: { r: 246, g: 103, b: 19, alpha: 1 } })
    .extend({ top: 64, bottom: 64, left: 64, right: 64, background: { r: 246, g: 103, b: 19, alpha: 1 } })
    .resize(512, 512)
    .png()
    .toFile(maskable);
  console.log('✓ Generated maskable icon (512x512)');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
