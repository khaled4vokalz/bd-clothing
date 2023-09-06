import {
  CategoryItemContainer,
  BackgroundImage,
  CategoryBodyContainer,
} from './category-item.styles';

export default function CategoryItem({ category: { imageUrl, title } }) {
  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <h2> {title}</h2>
        <p>Shop Now</p>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
}
