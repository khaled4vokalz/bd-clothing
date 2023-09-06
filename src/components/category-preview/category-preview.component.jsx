import ProductCard from '../product-card/product-card.component';
import {
  CategoryPreviewContainer,
  Preview,
  PreviewTitle,
} from './category-preview.styles';

export default function CategoryPreview({ title, products }) {
  return (
    <CategoryPreviewContainer>
      <h2>
        <PreviewTitle to={title}>{title}</PreviewTitle>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}
