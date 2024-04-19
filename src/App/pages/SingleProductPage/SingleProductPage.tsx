import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'components/Button';
import ProductCard from 'components/ProductCard';
import Text from 'components/Text';
import PaginationBackIcon from 'components/icons/PaginationBackIcon';
import { Product, ProductResponse } from '../MainPage/components/ProductGrid';
import styles from './SingleProductPage.module.scss';

const SingleProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { id } = useParams();

  const getProduct = useCallback(
    async (id: string) => {
      try {
        const response = await axios.get<ProductResponse>(`https://api.escuelajs.co/api/v1/products/${id}`);
        const newProduct = {
          id: response.data.id,
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          categoryName: response.data.category.name,
          categoryId: response.data.category.id,
          image: response.data.images[0].replace(/\["/, '').replace(/"\]/, ''),
        };
        setProduct(newProduct);
        return newProduct;
      } catch (error) {
        //
      }
    },
    [setProduct],
  );

  const getRelatedProducts = useCallback(
    async (productCategoryId: number) => {
      try {
        const response = await axios.get<ProductResponse[]>(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${productCategoryId}&offset=0&limit=3`,
        );
        setRelatedProducts(
          response.data.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            categoryName: item.category.name,
            categoryId: item.category.id,
            image: item.images[0].replace(/\["/, '').replace(/"\]/, ''),
          })),
        );
      } catch (error) {
        //
      }
    },
    [setRelatedProducts],
  );

  useEffect(() => {
    if (id) {
      getProduct(id).then((product) => {
        if (product?.categoryId) {
          getRelatedProducts(product.categoryId);
        }
      });
    }
  }, [id, getProduct, getRelatedProducts]);

  return (
    <>
      {product && (
        <div className={styles.single_product_page_container}>
          <div className={styles.single_product_page_inner_container}>
            <div className={styles.back_container}>
              <Link className={styles.back_link} to="/">
                <PaginationBackIcon fill="black" />
                <Text className={styles.back_title} weight="normal" view="p-20">
                  Назад
                </Text>
              </Link>
            </div>
            <div className={styles.product_container}>
              <img className={styles.product_image} src={product?.image} />
              <div className={styles.product_info_container}>
                <Text view="title" tag="h1" weight="bold" className={styles.product_title}>
                  {product?.title}
                </Text>
                <Text view="p-20" color="secondary" weight="normal" className={styles.product_description}>
                  {product?.description}
                </Text>
                <div className={styles.product_price_container}>
                  <Text view="title" weight="bold" className={styles.product_price}>
                    {'$' + product?.price}
                  </Text>
                  <div className={styles.product_buttons_container}>
                    <Button>
                      <Text view="button">Buy Now</Text>
                    </Button>
                    <Button className={styles.add_to_cart_button}>
                      <Text view="button" color="primary">
                        Add to Cart
                      </Text>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.related_items}>
              <Text className={styles.related_items_title} view="title" weight="bold">
                Related Items
              </Text>
            </div>
            <div className={styles.product_grid}>
              {relatedProducts.map((product) => (
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
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
