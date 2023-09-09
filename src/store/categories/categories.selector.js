export const selectCategoriesMap = state =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

export const hasCategories = state => !!state.categories.categories.length;
