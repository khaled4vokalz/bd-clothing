import './category-item.styles.scss';

export default function CategoryItem({ category: { imageUrl, title } }) {
  return (
    <div className="category-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2> {title}</h2>
        <p>Shop Now</p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
}
