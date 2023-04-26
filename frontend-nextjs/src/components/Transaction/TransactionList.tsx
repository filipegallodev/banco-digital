import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import { CircularProgress, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import TransactionTable from "./TransactionTable";

const TransactionList = () => {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );
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
    if (maxItems === 5) return;
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
        {loading && <CircularProgress />}
      </ButtonContainer>
      <TableContainer>
        {loading ? (
          <Skeleton
            animation={"wave"}
            variant="rectangular"
            width={1200}
            height={344}
            sx={{ borderRadius: "6px" }}
          />
        ) : (
          <TransactionTable
            transactions={transactionsList}
            maxItems={maxItems}
            setMaxItems={setMaxItems}
          />
        )}
      </TableContainer>
      {error && <p>{error}</p>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
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

export default TransactionList;
