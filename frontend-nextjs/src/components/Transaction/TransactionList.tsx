import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

const TransactionList = () => {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (data?.allTransactions) return;
    dispatch(fetchTransactionsList());
  }, [dispatch, data]);

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => router.push("transferencias/nova")}>
          Transferir
        </Button>
        <Button onClick={() => dispatch(fetchTransactionsList())}>
          Atualizar transações
        </Button>
      </ButtonContainer>
      {!loading ? (
        data && (
          <Table>
            <thead>
              <tr>
                <ColumnName>Valor</ColumnName>
                <ColumnName>Tipo</ColumnName>
                <ColumnName>Data</ColumnName>
              </tr>
            </thead>
            <tbody>
              {data.allTransactions?.map((transaction) => (
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
                </BodyLine>
              ))}
            </tbody>
          </Table>
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
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #f53fff;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: left;
  margin: 24px 0px;
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

const BodyLine = styled.tr`
  font-size: 1.25rem;
  height: 56px;
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
