import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { searchQuery, fetchHistory, setCurrentQuery } from "../../store/features/search/searchSlice";
import SearchResults from "../SearchResults";
import SearchHistory from "../SearchHistory";
import HighlightSearch from "../HighlightSearch";
import { MainContent, PageContainer, SearchBox, SearchInput, Sidebar } from "./styles";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setCurrentQuery(searchTerm.trim()));
      await dispatch(searchQuery({ query: searchTerm.trim(), page: 1 }));
      dispatch(fetchHistory());
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <SearchHistory onSelectQuery={setSearchTerm} />
      </Sidebar>
      <MainContent>
        <SearchBox>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
            />
          </form>
        </SearchBox>
        <HighlightSearch />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
        ) : (
          <SearchResults />
        )}
      </MainContent>
    </PageContainer>
  );
};

export default SearchPage; 