import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const TransactionList = () => {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [transactionsList, setTransactionsList] = useState<ITransaction[]>();
  const [maxItems, setMaxItems] = useState<number>(5);

  useEffect(() => {
    if (data?.allTransactions) {
      let i = 0;
      return setTransactionsList(
        data?.allTransactions.filter((transaction) => {
          if (i < maxItems) {
            i++;
            return transaction;
          }
        })
      );
    }
    dispatch(fetchTransactionsList());
  }, [dispatch, data, maxItems]);

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [transactionsList]);

  function handleTransactionListRefresh() {
    dispatch(fetchTransactionsList());
    setMaxItems(5);
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => router.push("transferencias/nova")}>
          Transferir
        </Button>
        <Button disabled={loading} onClick={handleTransactionListRefresh}>
          Atualizar transações
        </Button>
      </ButtonContainer>
      {!loading ? (
        transactionsList && (
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
                {transactionsList.map((transaction) => (
                  <BodyLine key={transaction.id}>
                    <Value
                      className={
                        transaction.creditedAccountId === user?.accountId
                          ? "negative"
                          : "positive"
                      }
                    >
                      {transaction.value}
                    </Value>
                    <td>
                      {transaction.creditedAccountId === user?.accountId
                        ? "Enviado"
                        : "Recebido"}
                    </td>
                    <td>
                      {transaction.createdAt.replace(
                        /((\d{4})\-(\d{2})\-(\d{2}))\D(\d{2}\:\d{2})\:\d{2}\.\d+\D+/g,
                        "$4/$3/$2 às $5"
                      )}
                    </td>
                    <td>{transaction.id}</td>
                  </BodyLine>
                ))}
              </tbody>
            </Table>
            <Button
              onClick={() => setMaxItems(maxItems + 5)}
              disabled={transactionsList.length < maxItems ? true : false}
            >
              Carregar mais
            </Button>
          </TableContainer>
        )
      ) : (
        <p>Buscando novas transferências...</p>
      )}
      {error && <p>{error}</p>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: #fa92ff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.1s;
  &:disabled {
    background-color: #e5e5e5;
    cursor: not-allowed;
  }
  &:enabled:hover {
    background-color: #f53fff;
  }
`;

const TableContainer = styled.div`
  margin: 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: 0px;
  border-radius: 6px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
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

export default TransactionList;
