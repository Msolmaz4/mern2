import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);
  //console.log(keyword,'key')
  const [price, setPrice] = useState({ min: 0, max: 300000000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 10;

  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products?.products.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getProducts({ keyword, price, rating, category }));
  }, [dispatch, keyword, price, rating, category]);
  return (
    <div className="min-h-screen">
      <div className="flex gap-4">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            "loading...."
          ) : (
            <div>
              {currentItems && (
                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                  {products?.products?.map((item, i) => (
                    <ProductCard product={item} key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div >
        <ReactPaginate   containerClassName="pagination-container"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<  previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Products;
