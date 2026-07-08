import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\hpcom\\.gemini\\antigravity\\brain\\4578e5c1-480c-4ac2-b31c-ed99fc221bed';
const destDir = './src/assets/images';

const filesToCopy = [
  { pattern: /argan_shampoo_.*\.png$/, name: 'argan_shampoo.png' },
  { pattern: /aloe_shampoo_.*\.png$/, name: 'aloe_shampoo.png' },
  { pattern: /rosemary_shampoo_.*\.png$/, name: 'rosemary_shampoo.png' },
  { pattern: /teatree_shampoo_.*\.png$/, name: 'teatree_shampoo.png' },
  { pattern: /coconut_shampoo_.*\.png$/, name: 'coconut_shampoo.png' },
  { pattern: /keratin_shampoo_.*\.png$/, name: 'keratin_shampoo.png' }
];

try {
  const files = fs.readdirSync(brainDir);
  filesToCopy.forEach(({ pattern, name }) => {
    const matched = files.find(f => pattern.test(f));
    if (matched) {
      const srcPath = path.join(brainDir, matched);
      const destPath = path.join(destDir, name);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${matched} -> ${name}`);
    } else {
      console.warn(`No match found for pattern: ${pattern}`);
    }
  });
  console.log('Local copy completed.');
} catch (err) {
  console.error('Error copying files:', err);
}
