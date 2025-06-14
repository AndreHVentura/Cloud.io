import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: ${({ theme }) => theme.backgroundGradient};
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
    color: ${({ theme }) => theme.text};
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

export const DateFilterBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.backgroundGradient};
  border: 1px solid #ccc;
  width: 320px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    font-weight: 500;

    input[type="date"] {
      margin-top: 4px;
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }

  div {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    button {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      font-weight: 500;

      &:last-child {
        background-color: #6c757d;
      }

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1rem;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  }

  span {
    font-weight: 500;
  }
`;