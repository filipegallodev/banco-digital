import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";

interface ICardInfo {
  type: string;
  owner: string;
}

const CardNew = () => {
  const [cardInfo, setCardInfo] = useState<ICardInfo>({
    type: "gold",
    owner: "",
  });

  return (
    <>
      <select
        value={cardInfo.type}
        onChange={({ target }) =>
          setCardInfo({ ...cardInfo, type: target.value })
        }
      >
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
      </select>
      <input
        type="text"
        value={cardInfo.owner}
        onChange={({ target }) =>
          setCardInfo({ ...cardInfo, owner: target.value })
        }
        style={{ textTransform: "uppercase" }}
      />
      <Container>
        <Card
          type={cardInfo.type}
          number="1234 1234 1234 1234"
          validity={
            new Date().getMonth() + 1 >= 10
              ? String(new Date().getMonth() + 1)
              : "0" +
                (new Date().getMonth() + 1) +
                "/" +
                String(Number(new Date().getFullYear()) + 10).replace(
                  /(\d{2})(\d{2})/g,
                  "$2"
                )
          }
          owner={cardInfo.owner}
        />
        <Card
          type="gold"
          number="1234 1234 1234 1234"
          validity="03/33"
          owner="Filipe Gallo"
        />
        <Card
          type="platinum"
          number="0000 0000 0000 0000"
          validity="06/29"
          owner="Filipe Gallo"
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 32px;
`;

export default CardNew;
