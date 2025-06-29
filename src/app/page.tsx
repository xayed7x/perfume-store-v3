// src/app/page.tsx

'use client';

import { mockProducts } from "@/data/products"; // We are back to using the local mock data
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import styles from './HomePage.module.css';
import { useSearch } from "@/context/SearchContext";
import { useEffect } from 'react';

export default function HomePage() {
  const { searchQuery } = useSearch();

  // We filter the simple mockProducts array directly, no fetching needed.
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // The auto-scroll for the search is still a good feature to keep.
  useEffect(() => {
    if (searchQuery) {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchQuery]);

  return (
    <main className={styles.main}>
      <Hero /> 

      <div className={styles.container} id="products">
        <h1 className={styles.title}>
          Our Perfume Collection
        </h1>
        <p className={styles.subtitle}>
          Discover a world of exquisite fragrances, crafted with passion and artistry. 
          Each bottle tells a unique story.
        </p>
        <div className={styles.grid}>
          {/* This now maps over our reliable, local mock data */}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}