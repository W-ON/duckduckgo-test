import styled from "styled-components";

export const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const PaginationInfo = styled.span`
  margin: 0 15px;
  color: #666;
`;

export const ResultItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  a {
    color: #1a0dab;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
