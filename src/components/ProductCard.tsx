// src/components/ProductCard.tsx

'use client';

import { PerfumeProduct } from '@/types';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';

type AddToCartButtonProps = {
  product: PerfumeProduct;
};

export default function ProductCard({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

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
      {/* The structure inside this div is now cleaner */}
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{product.name}</h2>
        {/* The flex-grow style on this description pushes everything below it to the bottom */}
        <p className={styles.cardDescription}>{product.description}</p>
        
        {/* The price and button are now direct children */}
        <p className={styles.cardPrice}>${product.price}</p>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}