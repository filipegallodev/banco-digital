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
import TransactionFilter from "./TransactionFilter";

const TransactionSection = () => {
  const { data, loading } = useAppSelector((state) => state.transactions);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [transactionsList, setTransactionsList] = useState<ITransaction[]>();
  const [maxItems, setMaxItems] = useState<number>(5);

  useEffect(() => {
    if (data?.filteredTransactions) {
      let i = 0;
      return setTransactionsList(
        data?.filteredTransactions.filter((transaction) => {
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
  }, [transactionsList, maxItems]);

  function handleTransactionListRefresh() {
    dispatch(fetchTransactionsList());
    setMaxItems(5);
  }

  return (
    <Container>
      <Styled.ButtonContainer>
        <Styled.Button onClick={() => router.push("transferencias/nova")}>
          Nova transferência
        </Styled.Button>
      </Styled.ButtonContainer>
      <TransactionFilter setMaxItems={setMaxItems} />
      <div>
        <HistoryContainer>
          <Styled.SubTitle>Histórico</Styled.SubTitle>
          <Styled.Button
            disabled={loading}
            onClick={handleTransactionListRefresh}
          >
            <RefreshRoundedIcon />
          </Styled.Button>
          {loading && <CircularProgress />}
        </HistoryContainer>
        {loading ? (
          <Skeleton
            animation={"wave"}
            variant="rectangular"
            width="100%"
            height={344}
            sx={{ borderRadius: "6px", marginBottom: "24px" }}
          />
        ) : (
          <TransactionTable
            transactions={transactionsList}
            maxItems={maxItems}
            setMaxItems={setMaxItems}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default TransactionSection;
