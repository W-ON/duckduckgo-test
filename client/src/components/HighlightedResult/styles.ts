import styled from "styled-components";

interface HighlightedTextProps {
  isHighlighted: boolean;
}

export const HighlightedText = styled.span<HighlightedTextProps>`
  background-color: ${(props) =>
    props.isHighlighted ? "#ffeb3b" : "transparent"};
`;
