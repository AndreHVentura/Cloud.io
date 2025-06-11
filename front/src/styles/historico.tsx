import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    flex: 1 1 auto;
    min-width: 120px;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007BFF;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
    }
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  th, td {
    border: 1px solid #333;
    padding: 0.5rem;
    text-align: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    color: black;
  }

  th {
    background-color: #ddd;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    th, td {
      padding: 0.4rem;
    }
  }
`;
