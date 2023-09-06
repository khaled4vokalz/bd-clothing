import CategoryItem from '../category-item/category-item.component';
import { CategoriesContainer } from './category-list.styles';

export default function CategoryList({ categories }) {
  return (
    <CategoriesContainer>
      {categories.map(category => {
        return (
          <CategoryItem key={category.id} category={category}></CategoryItem>
        );
      })}
    </CategoriesContainer>
  );
}
