import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import DetailsModal from "./DetailsModal";

const ProductsCard = ({ product }) => {
  const { product_image, product_name, description, price, ratings } = product;

  return (
    <div>
      <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div
          className="w-1/3 bg-cover"
          style={{
            backgroundImage: `url(${product_image})`,
          }}
        ></div>

        <div className="w-2/3 p-4 md:p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {product_name}
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>

          <div className="flex mt-2 items-center">
            <ReactStars
              count={5}
              value={ratings}
              size={24}
              activeColor="#ffd700"
            />
          </div>

          <div className="flex justify-between mt-3 items-center">
            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
              ${price}
            </h1>
            {/* Details Modal added there */}
            <div className="flex gap-4 justify-center">
              <DetailsModal product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.shape({
    product_image: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratings: PropTypes.number,
  }).isRequired,
};

export default ProductsCard;
