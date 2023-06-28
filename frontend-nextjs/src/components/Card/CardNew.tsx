import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import * as Styled from "../styles/Components.styled";

interface ICardInfo {
  type: string;
  validity: Date;
  number: string;
  owner: string;
  invoiceClosing: string;
}

const futureDate = new Date().getTime() + 315576000000;
const cardValidity = new Date(futureDate)
  .toLocaleDateString()
  .replace(/(\d+\/)(\d{2})\/(\d{2})(\d{2})/g, "$2/$4");
const cardNumber = "9999 9999 9999 9999";

const CardNew = () => {
  const user = useTokenAuthentication();
  const [cardInfo, setCardInfo] = useState<ICardInfo>({
    type: "gold",
    validity: new Date(futureDate),
    number: cardNumber,
    owner:
      user.data.user?.firstName.replace(/(\w+)\s((\w{1})\w+)(\D+)/g, "$1 $3") +
      " " +
      user.data.user?.lastName,
    invoiceClosing: "1",
  });

  if (!user.data.user) return null;
  return (
    <>
      <Styled.Text>
        Nosso cartão tem validade de <strong>10 anos</strong> a partir da
        contratação do mesmo.
      </Styled.Text>
      <FormContainer>
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
            Dia de fechamento da fatura
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
      </FormContainer>
      <Container>
        <Card
          type={cardInfo.type}
          number={cardNumber}
          validity={cardValidity}
          owner={cardInfo.owner}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 48px 0px;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  & div {
    width: 100%;
  }
`;

export default CardNew;
