import ReactPaginate from 'react-paginate';
import { PaginationProps } from 'types/pagination';

const paginationArrow = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.4751 2.04002L7.7351 5.30002C8.1201 5.68502 8.1201 6.31502 7.7351 6.70002L4.4751 9.96002"
      stroke="#667281"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Pagination: React.FC<PaginationProps> = (props) => (
  <div className="flex flex-col justify-center md:flex-row md:justify-between items-center mt-5 md:mt-9 mb-5 md:mb-0">
    <div className="flex items-center gap-3 w-60 mb-3 md:mb-0">
      <select
        onChange={props.onChange}
        className="appearance-none block w-20 px-4 py-3 rounded-lg bg-secondary focus:outline-blue-600"
      >
        {[5, 10, 20].map((pageNumb) => (
          <option key={pageNumb} value={pageNumb}>
            {pageNumb}
          </option>
        ))}
      </select>
      <div className="text-secondary">Showing 1 - {props.pageItems} of 20</div>
    </div>
    <ReactPaginate
      breakLabel="..."
      className="paginate"
      pageLinkClassName="paginate__link"
      nextLabel={paginationArrow}
      nextClassName="paginate__next"
      previousLabel={paginationArrow}
      previousClassName="paginate__previous"
      activeClassName="paginate--active"
      disabledClassName="paginate--disabled"
      onPageChange={props.onPageChange}
      pageRangeDisplayed={props.pageItems}
      pageCount={props.pageCount}
    />
  </div>
);
