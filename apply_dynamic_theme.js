const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\[#185D46\]/gi, replacement: 'primary' },
  { regex: /\[#0F172A\]/gi, replacement: 'secondary' },
  { regex: /\[#F59E0B\]/gi, replacement: 'accent' },
  { regex: /\[#10B981\]/gi, replacement: 'success' },
  { regex: /\[#334155\]/gi, replacement: 'foreground' },
  
  // also handle some hardcoded hover colors by mapping them to primary or opacity
  { regex: /\[#154d3a\]/gi, replacement: 'primary/90' },
  { regex: /\[#124836\]/gi, replacement: 'primary/90' },
  { regex: /\[#1e293b\]/gi, replacement: 'secondary/90' },
];

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

  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
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

console.log("Dynamic theme migration completed!");
