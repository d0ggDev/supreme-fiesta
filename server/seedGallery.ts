import "dotenv/config";
import { createBulkGalleryImages } from './db.ts';

const galleryData = [
  { "title": "1000_F_94545721_qrJcyuAT5pa3oshVUaMEcuhb4OdvGbWw", "description": "Image from Pictures folder", "imageUrl": "/gallery/1000_F_94545721_qrJcyuAT5pa3oshVUaMEcuhb4OdvGbWw.jpg", "category": "photos", "displayOrder": 0, "published": 1 },
  { "title": "1932990_An-Easy-Guide-To-Neurons-01", "description": "Image from Pictures folder", "imageUrl": "/gallery/1932990_An-Easy-Guide-To-Neurons-01.webp", "category": "photos", "displayOrder": 2, "published": 1 },
  { "title": "360_F_384620495_CrkUn9ZBHiiKu0X49L44EpjwnXqiXz3a", "description": "Image from Pictures folder", "imageUrl": "/gallery/360_F_384620495_CrkUn9ZBHiiKu0X49L44EpjwnXqiXz3a.jpg", "category": "photos", "displayOrder": 3, "published": 1 },
  { "title": "52763325-hand-drawn-cartoon-characters-man-and-pie-chart", "description": "Image from Pictures folder", "imageUrl": "/gallery/52763325-hand-drawn-cartoon-characters-man-and-pie-chart.jpg", "category": "photos", "displayOrder": 4, "published": 1 },
  { "title": "Astrocyte5", "description": "Image from Pictures folder", "imageUrl": "/gallery/Astrocyte5.jpg", "category": "photos", "displayOrder": 5, "published": 1 },
  { "title": "background1", "description": "Image from Pictures folder", "imageUrl": "/gallery/background1.jpg", "category": "photos", "displayOrder": 6, "published": 1 },
  { "title": "CachedImage", "description": "Image from Pictures folder", "imageUrl": "/gallery/CachedImage.jpeg", "category": "photos", "displayOrder": 7, "published": 1 },
  { "title": "coinnet", "description": "Image from Pictures folder", "imageUrl": "/gallery/coinnet.jpg", "category": "photos", "displayOrder": 8, "published": 1 },
  { "title": "download (1)", "description": "Image from Pictures folder", "imageUrl": "/gallery/download (1).jpg", "category": "photos", "displayOrder": 9, "published": 1 },
  { "title": "download", "description": "Image from Pictures folder", "imageUrl": "/gallery/download.jpeg", "category": "photos", "displayOrder": 10, "published": 1 },
  { "title": "fnmol-15-927479-g001", "description": "Image from Pictures folder", "imageUrl": "/gallery/fnmol-15-927479-g001.jpg", "category": "photos", "displayOrder": 11, "published": 1 },
  { "title": "gary", "description": "Image from Pictures folder", "imageUrl": "/gallery/gary.jpg", "category": "photos", "displayOrder": 12, "published": 1 },
  { "title": "images", "description": "Image from Pictures folder", "imageUrl": "/gallery/images.jpeg", "category": "photos", "displayOrder": 13, "published": 1 },
  { "title": "IMG-20240327-WA0004", "description": "Image from Pictures folder", "imageUrl": "/gallery/IMG-20240327-WA0004.jpg", "category": "photos", "displayOrder": 14, "published": 1 },
  { "title": "istockphoto-1153647058-612x612", "description": "Image from Pictures folder", "imageUrl": "/gallery/istockphoto-1153647058-612x612.jpg", "category": "photos", "displayOrder": 15, "published": 1 },
  { "title": "library", "description": "Image from Pictures folder", "imageUrl": "/gallery/library.jpg", "category": "photos", "displayOrder": 16, "published": 1 },
  { "title": "mr bitts", "description": "Image from Pictures folder", "imageUrl": "/gallery/mr bitts.webp", "category": "photos", "displayOrder": 17, "published": 1 },
  { "title": "relationships", "description": "Image from Pictures folder", "imageUrl": "/gallery/relationships.png", "category": "photos", "displayOrder": 18, "published": 1 },
  { "title": "server", "description": "Image from Pictures folder", "imageUrl": "/gallery/server.jpg", "category": "photos", "displayOrder": 19, "published": 1 }
];

async function seed() {
  try {
    console.log(`Inserting ${galleryData.length} images into gallery...`);
    const result = await createBulkGalleryImages(galleryData);
    console.log(`✓ Successfully inserted ${result.length} images`);
    console.log('Gallery images:', result);
  } catch (error) {
    console.error('✗ Failed to insert images:', error);
    process.exit(1);
  }
}

seed();