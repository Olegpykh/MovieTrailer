import React from 'react'

function ButtonPage({handleLoadMore,isLoading}) {
  return (
    <button
      onClick={handleLoadMore}
      disabled={isLoading}
      className="px-20 py-4 mb-12 text-xl text-white bg-yellow-500 rounded-full transxlition-colors hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
}

export default ButtonPage
