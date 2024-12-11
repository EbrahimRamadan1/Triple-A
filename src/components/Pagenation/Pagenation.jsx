/* eslint-disable react/prop-types */
export default function Pagenation({
  totalItems,
  nItems,
  setCurrentPage,
  currentPage,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / nItems); i++) {
    pages.push(i);
  }

  return (
    <div className="pt-6 flex gap-3 justify-center">
      {pages.map((page, i) => {
        return (
          <button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={`${
              page === currentPage
                ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                : "ring-gray-300  text-gray-600"
            } w-7 h-7 rounded-full  hover:bg-gradient-to-br`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
