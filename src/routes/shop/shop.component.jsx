import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

export default function Shop() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="products-container">
      {/* {Object.keys(categoriesMap).map(product => { */}
      {/*   return <ProductCard key={product.id} product={product} />; */}
      {/* })} */}
    </div>
  );
}
