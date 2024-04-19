import axios from 'axios';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import Text from 'components/Text';
import { useCallback, useEffect, useState } from 'react';
import styles from './ProductGrid.module.scss';
import { Link } from 'react-router-dom';
import PaginationBackIcon from 'components/icons/PaginationBackIcon';
import PaginationNextIcon from 'components/icons/PaginationNextIcon';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryName: string;
  categoryId: number;
  image: string;
};

export type ProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
    id: number;
    image: string;
  };
  images: string[];
};

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsQuantity, setProductsQuantity] = useState<number>(0);

  const productsPerPage = 9;

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get<ProductResponse[]>('https://api.escuelajs.co/api/v1/products?offset=0&limit=50');
      setProductsQuantity(response.data.length);
      setProducts(
        response.data.slice(0, 9).map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          categoryName: item.category.name,
          categoryId: item.category.id,
          image: item.images[0].replace(/\[\"/, '').replace(/\"\]/, ''),
        })),
      );
    } catch (error) {
      console.error(error);
    }
  }, [setProducts, setProductsQuantity]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.product_grid_container}>
      <div className={styles.product_grid_title}>
        <Text className={styles.total_product} weight="bold">
          Total Product
        </Text>
        <Text className={styles.product_quantity} weight="bold">
          {productsQuantity}
        </Text>
      </div>
      <div className={styles.product_grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            captionSlot={product.categoryName}
            title={product.title}
            subtitle={product.description}
            contentSlot={'$' + product.price}
            actionSlot={<Button>Add to Cart</Button>}
            product={product}
          />
        ))}
      </div>
      <div className={styles.product_pagination}>
        <Link to="" className={`${styles.product_pagination_item} ${styles.back}`}>
          <PaginationBackIcon />
        </Link>
        <Link to="" className={`${styles.product_pagination_item} ${styles.current}`}>
          1
        </Link>
        <Link to="" className={styles.product_pagination_item}>
          2
        </Link>
        <Link to="" className={styles.product_pagination_item}>
          3
        </Link>
        <Link to="" className={styles.product_pagination_item}>
          ...
        </Link>
        <Link to="" className={styles.product_pagination_item}>
          {Math.ceil(productsQuantity / productsPerPage)}
        </Link>
        <Link to="" className={`${styles.product_pagination_item} ${styles.next}`}>
          <PaginationNextIcon />
        </Link>
      </div>
    </div>
  );
};

export default ProductGrid;
