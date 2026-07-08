import fs from 'fs';
import https from 'https';
import path from 'path';

const mediaList = [
  // Remaining product images
  { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/dandruff_shampoo.png', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/growth_shampoo.png', type: 'image' },

  // Ingredient images
  { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/aloe_vera.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/coconut.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1594007567812-70b1350a41f6?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/rosemary.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/tea_tree.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/argan_oil.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/shea_butter.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/keratin.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/biotin.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1508747703725-719ae257c14a?auto=format&fit=crop&w=500&q=80', dest: 'src/assets/images/natural_herbs.jpg', type: 'image' },

  // Testimonial avatars
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', dest: 'src/assets/images/customer_priya.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', dest: 'src/assets/images/customer_zara.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', dest: 'src/assets/images/customer_ananya.jpg', type: 'image' },
  { url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80', dest: 'src/assets/images/customer_kavya.jpg', type: 'image' },

  // Cinematic videos
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4', dest: 'src/assets/videos/hero_bg.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-essential-oil-into-a-bottle-41908-large.mp4', dest: 'src/assets/videos/argan_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-dew-drops-on-green-leaves-4608-large.mp4', dest: 'src/assets/videos/aloe_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-herbs-in-a-wooden-spoon-on-a-table-41716-large.mp4', dest: 'src/assets/videos/rosemary_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-water-filtering-out-of-a-creek-4629-large.mp4', dest: 'src/assets/videos/teatree_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-fresh-coconut-milk-41857-large.mp4', dest: 'src/assets/videos/coconut_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-washing-her-hair-with-shampoo-43183-large.mp4', dest: 'src/assets/videos/keratin_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-water-splash-in-slow-motion-41864-large.mp4', dest: 'src/assets/videos/dandruff_video.mp4', type: 'video' },
  { url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-beautiful-hair-43093-large.mp4', dest: 'src/assets/videos/growth_video.mp4', type: 'video' }
];

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${url}:`, err.message);
      // Create a mock small file to prevent Vite compilation failure
      fs.writeFileSync(dest, '');
      console.log(`Created mock file: ${dest}`);
      resolve(false);
    });
  });
}

async function start() {
  console.log('Starting assets download...');
  for (const item of mediaList) {
    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Skip if file already exists with size > 0
    if (fs.existsSync(item.dest) && fs.statSync(item.dest).size > 0) {
      console.log(`Skipping (already exists): ${item.dest}`);
      continue;
    }
    await downloadFile(item.url, item.dest);
  }
  console.log('All downloads completed or mocked!');
}

start();
