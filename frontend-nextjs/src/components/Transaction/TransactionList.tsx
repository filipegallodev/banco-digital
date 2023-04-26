import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import { CircularProgress, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionTable from "./TransactionTable";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import * as Styled from "../styles/Components.styled";

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
        <Styled.Button onClick={() => router.push("transferencias/nova")}>
          Transferir
        </Styled.Button>
        <Styled.Button
          disabled={loading}
          onClick={handleTransactionListRefresh}
        >
          <RefreshRoundedIcon />
        </Styled.Button>
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

const TableContainer = styled.div`
  margin: 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export default TransactionList;
