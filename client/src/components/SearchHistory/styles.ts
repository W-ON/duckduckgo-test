import styled from "styled-components";

export const HistoryContainer = styled.div`
  h2 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

export const HistoryItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
