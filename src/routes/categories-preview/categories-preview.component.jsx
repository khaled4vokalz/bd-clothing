import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <>
      {!isLoading ? (
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
