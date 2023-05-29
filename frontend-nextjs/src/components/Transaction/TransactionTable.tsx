import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../styles/Components.styled";
import { useAppSelector } from "@/hooks/useAppSelector";

interface IProps {
  transactions: ITransaction[] | undefined;
  maxItems: number;
  setMaxItems: React.Dispatch<React.SetStateAction<any>>;
}

const TransactionTable = ({ transactions, maxItems, setMaxItems }: IProps) => {
  const user = useAppSelector((state: IReduxState) => state.user.data.user);
  const { error } = useAppSelector((state: IReduxState) => state.transactions);

  if (!transactions?.length)
    return (
      <Error>
        <p>{error}</p>
      </Error>
    );
  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <ColumnName>Valor</ColumnName>
              <ColumnName>Tipo</ColumnName>
              <ColumnName>Data</ColumnName>
              <ColumnName>ID</ColumnName>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <BodyLine key={transaction.id}>
                <Value
                  className={
                    transaction.originAccountId === user?.accountId
                      ? "negative"
                      : "positive"
                  }
                >
                  {transaction.value}
                </Value>
                <td>
                  {transaction.originAccountId === user?.accountId
                    ? "Enviado"
                    : "Recebido"}
                </td>
                <td>
                  {transaction.createdAt.replace(
                    /(\d{2}\/\d{2}\/\d{4}) (\d{2}\:\d{2})(\:\d{2})/g,
                    "$1 às $2"
                  )}
                </td>
                <td>
                  <TransactionId>{transaction.id}</TransactionId>
                </td>
              </BodyLine>
            ))}
          </tbody>
        </Table>
        <Button
          onClick={() => setMaxItems(maxItems + 5)}
          disabled={transactions.length < maxItems ? true : false}
        >
          {transactions.length < maxItems
            ? "Fim das transações"
            : "Carregar mais"}
        </Button>
      </TableContainer>
    </Container>
  );
};

const Error = styled.div`
  width: 1200px;
  height: 344px;
  font-size: 1.25rem;
  margin-bottom: 24px;
  text-align: center;
`;

const Container = styled.div`
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  margin-bottom: 24px;
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: 0px;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const ColumnName = styled.th`
  font-size: 1.5rem;
  background-color: #ddd;
  height: 64px;
  padding: 0px 16px;
  text-transform: uppercase;
`;

const AppearAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: initial;
    transform: initial;
  }
`;

const BodyLine = styled.tr`
  font-size: 1.25rem;
  height: 56px;
  animation: ${AppearAnimation} 0.5s forwards;
  &:nth-child(even) {
    background-color: #eee;
  }
  & td {
    padding: 0px 16px;
  }
`;

const Value = styled.td`
  &.negative {
    color: #f22;
  }
  &.positive {
    color: #2b2;
  }
`;

const TransactionId = styled.span`
  font-size: 0.875rem;
`;

export default TransactionTable;
