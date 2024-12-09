import styled from "styled-components";

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const MainContent = styled.main`
  padding: 2rem;
`;

export const SearchBox = styled.div`
  margin-bottom: 2rem;
`;

export const Sidebar = styled.aside`
  padding: 2rem;
  background-color: white;
  border-right: 1px solid #eee;
`;
