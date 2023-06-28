import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import CardHidden from "./CardHidden";

const CardList = () => {
  const { data } = useAppSelector((state) => state.card);

  if (!data.cards?.length)
    return (
      <Error>
        <p>Nenhum cartão encontrado.</p>
      </Error>
    );
  return (
    <CardContainer>
      {data.cards.map(({ id, type, number, cvv, validity, owner, hidden }) =>
        hidden ? (
          <CardHidden
            key={id}
            type={type}
            number={number}
            owner={owner}
            hidden={hidden}
          />
        ) : (
          <Card
            key={id}
            type={type}
            number={number}
            validity={validity}
            owner={owner}
            cvv={cvv}
            hidden={hidden}
          />
        )
      )}
    </CardContainer>
  );
};

const Error = styled.div`
  width: 1200px;
  height: 300px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
`;

export default CardList;
