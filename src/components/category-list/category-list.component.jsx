import CategoryItem from "../category-item/category-item.component";
import "./category-list.styles.scss";

export default function CategoryList({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return (
          <CategoryItem key={category.id} category={category}></CategoryItem>
        );
      })}
    </div>
  );
}