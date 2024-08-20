import { useState } from "react";
import PropTypes from "prop-types";

const DetailsModal = ({ product, handleDetailsClick,}) => {
  const [openModal, setOpenModal] = useState(false);

  // Handle button click to open the modal and check for user authentication
  const openModalHandler = () => {
    handleDetailsClick();
    if (localStorage.getItem("userEmail")) {
      setOpenModal(true);
    }
  };

  return (
    <div>
      <button
        onClick={openModalHandler}
        className="rounded-md bg-blue-600 py-2 px-5 text-white hover:bg-blue-700"
      >
        Details
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-5 shadow-lg dark:bg-[#1F2937] border border-gray-300 dark:border-gray-700">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Name: {product.product_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="text-center text-2xl font-medium text-gray-900 dark:text-white">
                ${product.price}
              </h2>
              <p className="rounded-lg bg-blue-600 p-2 text-center text-sm text-white">
                Category: {product.category || "General"}
              </p>
            </div>
            <img
              width={400}
              height={300}
              className="h-[300px] w-full rounded-lg bg-gray-600 object-cover"
              src={product.product_image}
              alt={product.product_name}
            />
            <button className="w-full rounded-lg bg-green-600 px-6 py-2 text-[12px] font-semibold text-white hover:bg-green-700 sm:text-sm md:text-base">
              Add to Cart
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="w-full rounded-lg bg-red-500 px-6 py-2 text-[12px] font-semibold text-white hover:bg-red-600 sm:text-sm md:text-base mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DetailsModal.propTypes = {
  product: PropTypes.shape({
    product_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    product_image: PropTypes.string.isRequired,
  }).isRequired,
  handleDetailsClick: PropTypes.func.isRequired,
  modalId: PropTypes.string.isRequired,
};

export default DetailsModal;
