import React from "react";
import { HighlightedText } from "./styles";

interface Props {
  text: string;
  searchTerm: string;
}

const HighlightedResult: React.FC<Props> = ({ text, searchTerm }) => {
  if (!text) return null;
  if (!searchTerm) return <>{text}</>;

  try {
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedSearchTerm})`, "gi"));

    return (
      <>
        {parts.map((part, index) => (
          <HighlightedText
            key={index}
            isHighlighted={part.toLowerCase() === searchTerm.toLowerCase()}
          >
            {part}
          </HighlightedText>
        ))}
      </>
    );
  } catch (error) {
    console.error('Error highlighting text:', error);
    return <>{text}</>;
  }
};

export default HighlightedResult; 