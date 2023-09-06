import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../../context/cart.context';
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from './product-card.styles';

export default function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addProductToCart = () => {
    addItemToCart(product);
  };
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}
