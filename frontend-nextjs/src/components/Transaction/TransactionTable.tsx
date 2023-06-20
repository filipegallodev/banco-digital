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
  const user = useAppSelector((state) => state.user.data.user);
  const { data } = useAppSelector((state) => state.transactions);

  if (!transactions?.length)
    return (
      <Error>
        <p>{data?.attention}</p>
      </Error>
    );
  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <ColumnName>Valor</ColumnName>
              <ColumnName className="show500">Tipo</ColumnName>
              <ColumnName>Data</ColumnName>
              <ColumnName className="show650">ID</ColumnName>
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
                <td className="show500">
                  {transaction.originAccountId === user?.accountId
                    ? "Enviado"
                    : "Recebido"}
                </td>
                <td>
                  {transaction.createdAt.replace(
                    /(\d{1,2})\/(\d{1,2})\/(\d{4})\D (\d{1,2})\:(\d{2})\:\d{2} (\D{2})/g,
                    `$2/$1/$3 às $4:$5 $6`
                  )}
                </td>
                <td className="show650">
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
  font-size: 1.5rem;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  @media (max-width: 650px) {
    & .show650 {
      display: none;
    }
  }
  @media (max-width: 500px) {
    & .show500 {
      display: none;
    }
  }
`;

const ColumnName = styled.th`
  font-size: 1.5rem;
  background-color: #fff;
  height: 72px;
  border-bottom: 2px solid #050505;
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
  height: 72px;
  background: #fff;
  animation: ${AppearAnimation} 0.5s forwards;
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
