// src/components/ProductCard.tsx

import { PerfumeProduct } from '@/types';
import Image from 'next/image';
import styles from './ProductCard.module.css';

// Note: This component no longer uses the Cart Context,
// so we can remove that import and logic.

type ProductCardProps = {
  product: PerfumeProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  // The <Link> component has been removed. This is now just a div.
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{product.name}</h2>
        <p className={styles.cardDescription}>{product.description}</p>
        <p className={styles.cardPrice}>${product.price}</p>
      </div>
    </div>
  );
}