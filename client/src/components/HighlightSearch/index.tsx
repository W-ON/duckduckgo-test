import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HighlightContainer, HighlightInput, MatchCount } from "./styles";
import { setHighlightTerm } from "../../store/features/search/searchSlice";
import { RootState } from "../../store";

const HighlightSearch: React.FC = () => {
  const dispatch = useDispatch();
  const { results, highlightTerm } = useSelector(
    (state: RootState) => state.search
  );
  const [localTerm, setLocalTerm] = useState("");

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setLocalTerm(term);
    dispatch(setHighlightTerm(term));
  };

  const getMatchCount = () => {
    if (!highlightTerm || !results.length) return 0;
    
    try {
      const escapedTerm = highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return results.reduce((count, result) => {
        if (!result.title) return count;
        const matches = (result.title.match(new RegExp(escapedTerm, "gi")) || []).length;
        return count + matches;
      }, 0);
    } catch (error) {
      console.error('Error counting matches:', error);
      return 0;
    }
  };

  return (
    <HighlightContainer>
      <HighlightInput
        type="text"
        value={localTerm}
        onChange={handleHighlightChange}
        placeholder="Highlight text..."
      />
      {highlightTerm && (
        <MatchCount>
          {getMatchCount()} matches found
        </MatchCount>
      )}
    </HighlightContainer>
  );
};

export default HighlightSearch; 