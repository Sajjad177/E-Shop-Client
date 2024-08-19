import { useQuery } from "@tanstack/react-query";
import ProductsCard from "../Components/ProductsCard";
import  { useState } from "react";
import Loader from "../Components/Loader";

const Products = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const limit = 6;

  const fetchProducts = async ({ queryKey }) => {
    const [_key, { page, limit, search, sort, category, price }] = queryKey;
    const query = new URLSearchParams({
      page,
      limit,
      search,
      sort,
      category,
      price,
    }).toString();
    const response = await fetch(`http://localhost:3000/Products?${query}`);
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", { page, limit, search, sort, category, price }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const products = data.products;
  const total = data.total;
  const totalPages = Math.ceil(total / limit);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  return (
    <div className="bg-base-200">
      <div className="container mx-auto pt-12 pb-24">
        <h1 className="text-5xl text-center font-bold">Featured Products</h1>

        {/* Search, Filter, and Sort Options */}
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center mt-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="input input-bordered w-full max-w-xs"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="select select-bordered"
          >
            <option value="">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Camera">Camera</option>
            <option value="Laptop">Laptop</option>
            {/* <option value="Coats">Coats</option>
            <option value="Pants">Pants</option>
            <option value="Shorts">Shorts</option>
            <option value="Jeans">Jeans</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Jackets">Jackets</option>
            <option value="Shirts">Shirts</option>
            <option value="Blazers">Blazers</option>
            <option value="Footwear">Footwear</option>
            <option value="Dresses">Dresses</option>
            <option value="Accessories">Accessories</option>
            <option value="Swimwear">Swimwear</option>
            <option value="Skirts">Skirts</option> */}
            {/* Add more categories as needed */}
          </select>
          <select
            value={price}
            onChange={handlePriceChange}
            className="select select-bordered"
          >
            <option value="">All Prices</option>
            <option value="0-50">0 - 50</option>
            <option value="50-100">50 - 100</option>
            {/* Add more price ranges as needed */}
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className="select select-bordered"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-24">
          {products.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-8">
          <button
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>{`Page ${page} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
