import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import {
  hasCategories,
  selectCategoriesMap,
} from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesExits = useSelector(hasCategories);
  return (
    <>
      {categoriesExits ? (
        Object.keys(categoriesMap).map(title => (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
}
