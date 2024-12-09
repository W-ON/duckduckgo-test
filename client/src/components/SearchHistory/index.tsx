import React from "react";
import { useSelector } from "react-redux";
import { HistoryContainer, HistoryItem } from "./styles";
import { RootState } from "../../store";

interface Props {
  onSelectQuery: (query: string) => void;
}

const SearchHistory: React.FC<Props> = ({ onSelectQuery }) => {
  const { history } = useSelector((state: RootState) => state.search);

  return (
    <HistoryContainer>
      <h2>Search History</h2>
      {history.map((item, index) => (
        <HistoryItem
          key={index}
          onClick={() => onSelectQuery(item.query)}
        >
          {item.query}
        </HistoryItem>
      ))}
    </HistoryContainer>
  );
};

export default SearchHistory; 