import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import HighlightedResult from "../HighlightedResult";
import { NoResults, Pagination, PaginationInfo, ResultItem } from "./styles";
import { searchQuery } from "../../store/features/search/searchSlice";
import { AppDispatch } from "../../store";

const SearchResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    results, 
    currentPage, 
    highlightTerm,
    totalPages,
    total,
    currentQuery 
  } = useSelector((state: RootState) => state.search);

  if (!results || results.length === 0) {
    return <NoResults>No results found</NoResults>;
  }

  const handlePageChange = (newPage: number) => {
    if (currentQuery) {
      dispatch(searchQuery({ query: currentQuery, page: newPage }));
    }
  };

  return (
    <div>
      {results.map((result, index) => (
        <ResultItem key={`${result.url}-${index}`}>
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            <HighlightedResult 
              text={result.title || 'No title available'} 
              searchTerm={highlightTerm || ''} 
            />
          </a>
        </ResultItem>
      ))}
      {totalPages > 1 && (
        <Pagination>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <PaginationInfo>
            Page {currentPage} of {totalPages} ({total} results)
          </PaginationInfo>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResults; 