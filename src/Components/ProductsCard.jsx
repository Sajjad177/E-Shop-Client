import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import DetailsModal from "./DetailsModal";
import toast, { Toaster } from "react-hot-toast";

const ProductsCard = ({ product }) => {
  const { product_image, product_name, price, ratings, _id } =
    product;

  const handleDetailsClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast.error("Please sign in to view product details.");
    } else {
      document.getElementById(`details_modal_${_id}`);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full mx-auto space-y-4 rounded border p-6 dark:border-zinc-700 dark:bg-zinc-900">
        {/* Card Image */}
        <img
          width={350}
          height={190}
          className="h-[350px] w-full rounded-2xl bg-gray-400"
          src={product_image}
          alt="card navigate ui"
        />
        {/* Card Heading */}
        <div className="space-y-2">
          <h2 className="font-medium text-slate-800 sm:text-lg md:text-xl dark:text-white/90">
            {product_name}
          </h2>
          {/* rating  */}
          <div className="flex items-center mt-2">
            <ReactStars
              count={5}
              value={ratings}
              size={24}
              activeColor="#FFA823"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-medium text-gray-700 md:text-xl dark:text-white/60">
            {price}
          </h2>
          <div className="flex gap-4">
            {/* Details Modal added here */}
            <DetailsModal
              handleDetailsClick={handleDetailsClick}
              modalId={`details_modal_${_id}`}
              product={product}
            />
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
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductsCard;
