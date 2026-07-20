const fs = require('fs');
const path = require('path');

const primaryGreens = [
  '#00A97A', '#00a97a',
  '#14796B', '#14796b',
  '#0C4A41', '#0c4a41',
  '#16A34A', '#16a34a',
  '#22C55E', '#22c55e',
  '#047857',
  '#059669',
  '#10B981', '#10b981',
  '#064E3B', '#064e3b'
];

const hoverGreens = [
  '#00825E', '#00825e',
  '#0F5C51', '#0f5c51',
  '#08332D', '#08332d'
];

const rgbaGreens = [
  'rgba(20, 121, 107',
  'rgba(0, 169, 122',
  'rgba(12, 74, 65',
  'rgba(22, 163, 74',
  'rgba(34, 197, 94'
];

const targetPrimary = '#154D3B';
const targetHover = '#0F3A2C';
const targetRgba = 'rgba(21, 77, 59';

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
