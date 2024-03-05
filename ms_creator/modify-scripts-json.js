const fs = require('fs');

const fileName = 'package.json'
const unparseContent = fs.readFileSync(fileName, 'utf-8');
const content = JSON.parse(unparseContent);

content.scripts.dev = 'ts-node-dev index.ts';
content.scripts.start = 'tsc && node build/index.js';

const updatedContent = JSON.stringify(content, null, 2);

fs.writeFileSync(fileName, updatedContent);

console.log('Valor modificado correctamente.');