import React from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { CircularProgress, Skeleton } from "@mui/material";
import styled from "styled-components";
import * as Styled from "../styles/Components.styled";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useAppSelector";
import CardList from "./CardList";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getCards } from "@/store/reducers/card";

const CardSection = () => {
  const { loading } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleCardListRefresh() {
    dispatch(getCards());
  }

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
          <Styled.Button disabled={loading} onClick={handleCardListRefresh}>
            <RefreshRoundedIcon />
          </Styled.Button>
          {loading && <CircularProgress />}
        </HistoryContainer>
        {loading ? (
          <SkeletonContainer>
            <Skeleton
              animation={"wave"}
              variant="rectangular"
              width={500}
              height={320}
              sx={{ borderRadius: "16px" }}
            />
            <Skeleton
              animation={"wave"}
              variant="rectangular"
              width={500}
              height={320}
              sx={{ borderRadius: "16px" }}
            />
          </SkeletonContainer>
        ) : (
          <CardList />
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

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
`;

export default CardSection;
