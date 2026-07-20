const fs = require('fs');
const path = require('path');

const primaryGreens = [
  '#154D3B', '#154d3b'
];

const hoverGreens = [
  '#0F3A2C', '#0f3a2c'
];

const rgbaGreens = [
  'rgba(21, 77, 59',
  'rgba(21,77,59'
];

// 1 shade lighter
const targetPrimary = '#185D46';
const targetHover = '#124836';
const targetRgba = 'rgba(24, 93, 70';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceColorsInFile(filePath) {
  if (!filePath.match(/\.(tsx|ts|css|jsx|js)$/)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace primary greens
  primaryGreens.forEach(color => {
    const regex = new RegExp(color, 'g');
    content = content.replace(regex, targetPrimary);
  });

  // Replace hover greens
  hoverGreens.forEach(color => {
    const regex = new RegExp(color, 'g');
    content = content.replace(regex, targetHover);
  });

  // Replace rgba greens
  rgbaGreens.forEach(color => {
    const regex = new RegExp(color.replace(/\(/g, '\\(').replace(/,/g, ',\\s*'), 'g');
    content = content.replace(regex, targetRgba);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${filePath}`);
  }
}

['components', 'app'].forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    walkDir(fullPath, replaceColorsInFile);
  }
});
