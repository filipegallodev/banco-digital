import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import * as Styled from "../styles/Components.styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Checkbox } from "@mui/material";
import { clearCardStatus, fetchCard } from "@/store/reducers/card";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import CardBenefits from "./CardBenefits";

const futureDate = new Date().getTime() + 315576000000;
const cardValidity = new Date(futureDate)
  .toLocaleDateString()
  .replace(/(\d+\/)(\d{2})\/(\d{2})(\d{2})/g, "$2/$4");
const cardNumber = "9999 9999 9999 9999";

const CardNew = () => {
  const user = useTokenAuthentication();
  const router = useRouter();
  const { data, loading, error } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState<ICardForm>({
    type: "gold",
    validity: new Date(futureDate),
    number: cardNumber,
    owner: "",
    invoiceClosing: "1",
  });

  useEffect(() => {
    if (user.data.user?.firstName && user.data.user?.lastName)
      setCardInfo({
        ...cardInfo,
        owner:
          user.data.user?.firstName.replace(
            /(\w+)\s((\w{1})\w+)(\D+)/g,
            "$1 $3"
          ) +
          " " +
          user.data.user?.lastName,
      });
  }, [user.data.user]);

  useEffect(() => {
    dispatch(clearCardStatus());
  }, []);

  useEffect(() => {
    if (data.status || error) router.push("/cartoes");
  }, [router, data.status, error]);

  function handleCardRequest() {
    if (cardInfo && confirmation) dispatch(fetchCard(cardInfo));
  }

  if (!user.data.user) return null;
  return (
    <>
      <Styled.Text>
        Nosso cartão tem validade de <strong>10 anos</strong> a partir da
        contratação do mesmo.
      </Styled.Text>
      <Styled.SubTitle>Detalhes</Styled.SubTitle>
      <CardInfoContainer>
        <div>
          <Styled.Label htmlFor="card-type">Tipo do cartão</Styled.Label>
          <Styled.Select
            id="card-type"
            value={cardInfo.type}
            onChange={({ target }) =>
              setCardInfo({ ...cardInfo, type: target.value })
            }
          >
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </Styled.Select>
        </div>
        <div>
          <Styled.Label htmlFor="card-invoice-closing">
            Dia da fatura
          </Styled.Label>
          <Styled.Select
            id="card-invoice-closing"
            value={cardInfo.invoiceClosing}
            onChange={({ target }) =>
              setCardInfo({ ...cardInfo, invoiceClosing: target.value })
            }
          >
            {Array.from(new Array(30)).map((item, day) => (
              <option key={day}>{day + 1}</option>
            ))}
          </Styled.Select>
        </div>
      </CardInfoContainer>
      <CardBenefits />
      <Styled.SubTitle>Pré-visualização</Styled.SubTitle>
      <Container>
        <Card
          type={cardInfo.type}
          number={cardNumber}
          validity={cardValidity}
          owner={cardInfo.owner}
          cvv={"XXX"}
          hidden={false}
        />
      </Container>
      <Styled.SubTitle>Confirmação e Solicitação</Styled.SubTitle>
      <Styled.Text>
        Confirme todas as informações antes de solicitar seu cartão.
      </Styled.Text>
      <Styled.FormControlLabelStyled
        required
        control={<Checkbox />}
        label="Confirmo as informações."
        value={confirmation}
        onChange={() => setConfirmation(!confirmation)}
      />
      <Styled.Button
        onClick={handleCardRequest}
        disabled={!confirmation || loading}
      >
        Solicitar cartão
      </Styled.Button>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 48px 0px;
  display: flex;
  justify-content: center;
`;

const CardInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  & div {
    width: 100%;
  }
`;

export default CardNew;
