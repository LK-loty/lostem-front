import Pagination from "react-js-pagination";

const Paginate = ({ page, totalItemsCount, postPerPage, handlePageChange }) => {
  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={postPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        firstPageText={""}
        lastPageText={""}
        onChange={handlePageChange}
      />
    </>
  );
};
export default Paginate;
