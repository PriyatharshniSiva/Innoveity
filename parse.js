const fs = require('fs');
const content = fs.readFileSync('C:/Users/thars/.gemini/antigravity-ide/brain/d3be8d0b-d4c4-44f2-9e67-be6f2c1c6cd6/.system_generated/steps/49/content.md', 'utf-8');

const imgs = content.match(/https:\/\/images.pexels.com[^"']+/g) || [];
console.log(Array.from(new Set(imgs)));
