// src/app/page.tsx

'use client';

import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import styles from './HomePage.module.css';
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from 'react';
import { PerfumeProduct } from "@/types";

export default function HomePage() {
  const [products, setProducts] = useState<PerfumeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products from the server.');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('API did not return an array.');
        }
      } catch (err: any) {
        console.error("Error in fetchProducts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery) {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchQuery]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading products...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }
    if (filteredProducts.length === 0 && !searchQuery) {
        return <p>No products found.</p>;
    }
    return (
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

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
        {renderContent()}
      </div>
    </main>
  );
}