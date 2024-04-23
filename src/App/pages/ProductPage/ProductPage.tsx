import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import Slider from 'components/Slider';
import Text from 'components/Text';
import LoaderPage from '../LoaderPage';
import { Product, ProductResponse } from '../MainPage/components/ProductGrid/types';
import ProductList from '../MainPage/components/ProductList';
import s from './ProductPage.module.scss';
import { getUniqueProducts, normalizeProduct } from './utilities';

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { id } = useParams();
  const relatedProductsQuantity = 3;

  useEffect(() => {
    if (id) {
      axios
        .get<ProductResponse>(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then((response) => {
          const responseArray: ProductResponse[] = [response.data];
          setProduct(normalizeProduct(responseArray)[0]);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            throw error;
          } else {
            throw new Error('Error while getting product');
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (!product?.categoryId || !id) {
      return;
    }

    axios
      .get<ProductResponse[]>(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${product.categoryId}&offset=0&limit=${relatedProductsQuantity + 1}`,
      )
      .then((response) => {
        setRelatedProducts(normalizeProduct(getUniqueProducts(response.data, id, relatedProductsQuantity)));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Error while getting related products');
        }
      });
  }, [id, product?.categoryId]);

  if (!product) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={s['product-page-container']}>
      <div className={s['product-page']}>
        <div className={s['product-page__back-container']}>
          <BackButton />
        </div>
        <div className={s['product-page__product-container']}>
          <Slider className={s['product-page__product-image']} images={product.image} />
          <div className={s['product-page__product-info-container']}>
            <Text view="title" tag="h1" weight="bold">
              {product?.title}
            </Text>
            <Text view="p-20" color="secondary" weight="normal" className={s['product-page__product-description']}>
              {product?.description}
            </Text>
            <div className={s['product-page__product-price-container']}>
              <Text view="title" weight="bold" className={s['product-page__product-price']}>
                {'$' + product?.price}
              </Text>
              <div className={s['product-page__product-buttons-container']}>
                <Button>
                  <Text view="button">Buy Now</Text>
                </Button>
                <Button className={s['product-page__add-to-cart-button']}>
                  <Text view="button" color="primary">
                    Add to Cart
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={s['product-page__related-items-container']}>
          <Text className={s['product-page__related-items-title']} view="title" weight="bold">
            Related Items
          </Text>
        </div>
        <ProductList products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
