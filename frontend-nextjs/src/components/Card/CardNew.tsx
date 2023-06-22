import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import useTokenAuthentication from "@/hooks/useTokenAuthentication";
import * as Styled from "../styles/Components.styled";

interface ICardInfo {
  type: string;
}

const CardNew = () => {
  const user = useTokenAuthentication();
  const [cardInfo, setCardInfo] = useState<ICardInfo>({
    type: "gold",
  });

  if (!user.data.user) return null;
  return (
    <>
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
          owner={
            user.data.user?.firstName.replace(
              /(\w+)\s((\w{1})\w+)(\D+)/g,
              "$1 $3"
            ) +
            " " +
            user.data.user?.lastName
          }
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

export default CardNew;
