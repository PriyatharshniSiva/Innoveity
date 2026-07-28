const fs = require('fs');
const path = require('path');

const replacements = [
  // Backgrounds
  { regex: /bg-emerald-50\/90/g, replacement: 'bg-primary/10' },
  { regex: /bg-emerald-50\/50/g, replacement: 'bg-primary/5' },
  { regex: /bg-emerald-50/g, replacement: 'bg-primary/10' },
  { regex: /bg-emerald-100/g, replacement: 'bg-primary/20' },
  { regex: /bg-emerald-200/g, replacement: 'bg-primary/30' },
  { regex: /bg-emerald-300/g, replacement: 'bg-primary/40' },
  { regex: /bg-emerald-400\/10/g, replacement: 'bg-primary/10' },
  { regex: /bg-emerald-400/g, replacement: 'bg-primary/60' },
  { regex: /bg-emerald-500\/30/g, replacement: 'bg-primary/30' },
  { regex: /bg-emerald-500/g, replacement: 'bg-primary' },
  { regex: /bg-emerald-600/g, replacement: 'bg-primary' },
  { regex: /bg-emerald-950\/90/g, replacement: 'bg-secondary/90' },
  { regex: /bg-emerald-950/g, replacement: 'bg-secondary' },
  { regex: /bg-amber-500/g, replacement: 'bg-warning' },
  
  // Texts
  { regex: /text-emerald-100\/90/g, replacement: 'text-primary/20' },
  { regex: /text-emerald-100/g, replacement: 'text-primary' },
  { regex: /text-emerald-200/g, replacement: 'text-primary/80' },
  { regex: /text-emerald-300/g, replacement: 'text-primary/70' },
  { regex: /text-emerald-400/g, replacement: 'text-primary/90' },
  { regex: /text-emerald-500/g, replacement: 'text-primary' },
  { regex: /text-emerald-600/g, replacement: 'text-primary' },
  { regex: /text-emerald-700/g, replacement: 'text-primary' },
  { regex: /text-emerald-800/g, replacement: 'text-primary' },
  
  // Borders
  { regex: /border-emerald-100/g, replacement: 'border-primary/20' },
  { regex: /border-emerald-200\/50/g, replacement: 'border-primary/30' },
  { regex: /border-emerald-200/g, replacement: 'border-primary/30' },
  { regex: /border-emerald-800/g, replacement: 'border-primary/80' },
  { regex: /border-emerald-950/g, replacement: 'border-secondary' },

  // Gradients
  { regex: /from-emerald-500\/20/g, replacement: 'from-primary/20' },
  { regex: /via-teal-400\/10/g, replacement: 'via-secondary/10' },
  { regex: /to-green-600\/20/g, replacement: 'to-accent/20' },
  { regex: /from-green-500\/20/g, replacement: 'from-accent/20' },
  { regex: /via-emerald-400\/10/g, replacement: 'via-primary/10' },
  { regex: /to-teal-500\/20/g, replacement: 'to-secondary/20' },
  { regex: /from-teal-500\/20/g, replacement: 'from-secondary/20' },
  { regex: /via-green-400\/10/g, replacement: 'via-accent/10' },
  { regex: /to-emerald-600\/20/g, replacement: 'to-primary/20' },
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

console.log("Migration completed!");
