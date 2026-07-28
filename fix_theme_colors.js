const fs = require('fs');
const path = require('path');

const cssVariables = {
  '#185d46': 'var(--color-brand-primary, #185D46)',
  '#0f172a': 'var(--color-brand-secondary, #0F172A)',
  '#f59e0b': 'var(--color-brand-accent, #F59E0B)',
  '#10b981': 'var(--color-success, #10B981)',
  '#334155': 'var(--foreground, #334155)'
};

const tailwindClasses = {
  '#185d46': 'primary',
  '#0f172a': 'secondary',
  '#f59e0b': 'accent',
  '#10b981': 'success',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Tailwind arbitrary values like bg-[#185D46] -> bg-primary
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2})?\]/g, (match, prefix, hex, alpha) => {
    const lowerHex = '#' + hex.toLowerCase();
    if (tailwindClasses[lowerHex]) {
      let replacement = `${prefix}-${tailwindClasses[lowerHex]}`;
      if (alpha) {
        let alphaPercent = alpha;
        if (alpha === '10') alphaPercent = '10';
        if (alpha === '20') alphaPercent = '20';
        if (alpha === '30') alphaPercent = '20'; // Hex 30 is roughly 20% alpha
        replacement += `/${alphaPercent}`;
      }
      return replacement;
    }
    return match;
  });

  // 2. Inline styles or raw hex codes
  content = content.replace(/#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2})?/g, (match, hex, alpha) => {
    const lowerHex = '#' + hex.toLowerCase();
    if (cssVariables[lowerHex]) {
      if (alpha) {
        if (alpha === '30' || alpha === '20' || alpha === '10') {
          return `color-mix(in srgb, ${cssVariables[lowerHex]} 20%, transparent)`;
        }
        return match;
      }
      return cssVariables[lowerHex];
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.match(/\.(tsx|ts|jsx|js)$/)) {
      processFile(dirPath);
    }
  });
}

walkDir(path.join(process.cwd(), 'app', '(main)'));
walkDir(path.join(process.cwd(), 'components'));
