import { useNavigate } from 'react-router-dom';
import {
  CategoryItemContainer,
  BackgroundImage,
  CategoryBodyContainer,
} from './category-item.styles';

export default function CategoryItem({ category: { imageUrl, title, route } }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(route);
  };
  return (
    <CategoryItemContainer onClick={onClickHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <CategoryBodyContainer>
        <h2> {title}</h2>
        <p>Shop Now</p>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
}
