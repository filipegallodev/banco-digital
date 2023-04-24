import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import React, { useEffect } from "react";
import styled from "styled-components";

const TransactionList = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);

  useEffect(() => {
    if (data?.allTransactions) return;
    dispatch(fetchTransactionsList());
  }, [dispatch, data]);

  if (loading) return <p>Buscando novas transferências...</p>;
  if (error) return <p>{error}</p>;
  return (
    <Container>
      <button onClick={() => dispatch(fetchTransactionsList())}>
        Atualizar transações
      </button>
      {data && (
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
                <td>{transaction.createdAt}</td>
              </BodyLine>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
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
