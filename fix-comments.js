const fs = require('fs');
const path = require('path');

function fixCommentsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  
  // Fix comments in sinth code blocks
  content = content.replace(/```sinth([\s\S]*?)```/g, (match, codeBlock) => {
    // Replace # comments with -- comments
    let fixed = codeBlock
      // Replace inline comments: code # comment -> code -- comment
      .replace(/^(\s*.*?)\s+#\s+(.*)$/gm, '$1 -- $2')
      // Replace full line comments: # comment -> -- comment
      .replace(/^(\s*)#\s+(.*)$/gm, '$1-- $2');
    return '```sinth' + fixed + '```';
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      count += walkDir(fullPath);
    } else if (file.endsWith('.md')) {
      if (fixCommentsInFile(fullPath)) {
        console.log('Fixed:', fullPath);
        count++;
      }
    }
  }
  return count;
}

const total = walkDir('.');
console.log('Total files fixed:', total);