import React from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import * as Styled from "../styles/Components.styled";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useAppSelector";

const CardSection = () => {
  const { loading } = useAppSelector((state) => state.user);
  const router = useRouter();

  function handleTransactionListRefresh() {}

  return (
    <Container>
      <Styled.ButtonContainer>
        <Styled.Button onClick={() => router.push("cartoes/novo")}>
          Solicitar cartão
        </Styled.Button>
      </Styled.ButtonContainer>
      <div>
        <HistoryContainer>
          <Styled.SubTitle>Meus cartões</Styled.SubTitle>
          <Styled.Button
            disabled={loading}
            onClick={handleTransactionListRefresh}
          >
            <RefreshRoundedIcon />
          </Styled.Button>
          {loading && <CircularProgress />}
        </HistoryContainer>
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

export default CardSection;
