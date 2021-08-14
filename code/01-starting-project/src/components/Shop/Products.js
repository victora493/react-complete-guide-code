import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    title: 'my first book',
    price: 10,
    description: 'lorem10 opsdk spo[dkl p[oskld',
    id: 0
  },
  {
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
    id: 1
  },
  {
    title: 'sopa de macaco',
    price: 50,
    description: 'kkkkkk sopa de macaco uma delicia',
    id: 2
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        { DUMMY_PRODUCTS.map(product => (
          <ProductItem
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            id={product.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
