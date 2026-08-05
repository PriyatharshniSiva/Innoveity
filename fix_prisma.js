const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Check if it creates a PrismaClient
    if (content.includes('new PrismaClient()')) {
      // 1. Replace the import
      content = content.replace(/import\s*{\s*PrismaClient\s*}\s*from\s*['"]@prisma\/client['"];?/g, 'import { prisma } from "@/lib/prisma";');
      
      // 2. Remove the instantiation
      content = content.replace(/(?:export\s+)?const\s+prisma\s*=\s*new\s+PrismaClient\(\)\s*;?/g, '');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
