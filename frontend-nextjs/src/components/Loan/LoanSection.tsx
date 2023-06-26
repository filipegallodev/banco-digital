import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getLoans } from "@/store/reducers/loan";
import { CircularProgress, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import * as Styled from "../styles/Components.styled";
import LoanTable from "./LoanTable";
import LoanFilter from "./LoanFilter";

const LoanSection = () => {
  const { data, loading } = useAppSelector((state) => state.loan);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loanList, setLoanList] = useState<ILoan[]>();
  const [maxItems, setMaxItems] = useState<number>(5);
  const [nextLoan, setNextLoan] = useState({
    date: "",
    time: "",
    milliseconds: 0,
  });

  useEffect(() => {
    if (data.loans && data.loans.length && data.nextLoan) {
      return setNextLoan({
        date: new Date(data.nextLoan).toLocaleDateString(),
        time: new Date(data.nextLoan).toLocaleTimeString(),
        milliseconds: data.nextLoan,
      });
    }
  }, [data.loans, data.nextLoan]);

  useEffect(() => {
    if (data.filteredLoans) {
      let i = 0;
      return setLoanList(
        data?.filteredLoans.filter((loan) => {
          if (i < maxItems) {
            i++;
            return loan;
          }
        })
      );
    }
    dispatch(getLoans());
  }, [dispatch, data, maxItems]);

  useEffect(() => {
    if (maxItems === 5) return;
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [loanList, maxItems]);

  function handleLoanListRefresh() {
    dispatch(getLoans());
    setMaxItems(5);
  }

  return (
    <Container>
      <Styled.Button onClick={() => router.push("/emprestimos/novo")}>
        {nextLoan.milliseconds && new Date().getTime() < nextLoan.milliseconds
          ? "Simular empréstimo"
          : "Solicitar empréstimo"}
      </Styled.Button>
      {nextLoan.milliseconds && new Date().getTime() < nextLoan.milliseconds ? (
        <Styled.Text style={{ marginTop: "24px" }}>
          Próximo empréstimo disponível em <strong>{nextLoan.date}</strong> às{" "}
          <strong>{nextLoan.time}</strong>.
        </Styled.Text>
      ) : null}
      <LoanFilter setMaxItems={setMaxItems} />
      <div>
        <HistoryContainer>
          <Styled.SubTitle>Histórico</Styled.SubTitle>
          <Styled.Button disabled={loading} onClick={handleLoanListRefresh}>
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
          <LoanTable
            loans={loanList}
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

export default LoanSection;
