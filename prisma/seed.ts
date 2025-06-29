// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { mockProducts } from '../src/data/products'; // We go up one level to find the src folder

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Loop through our mock products
  for (const productData of mockProducts) {
    // Create a new product in the database for each one
    const product = await prisma.product.create({
      data: productData,
    });
    console.log(`Created product with id: ${product.id}`);
  }

  console.log('Seeding finished.');
}

// Execute the main function and handle success or error
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });