import React from "react";
import styled from "styled-components";
import Card from "./Card";

const CardNew = () => {
  return (
    <Container>
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
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default CardNew;
