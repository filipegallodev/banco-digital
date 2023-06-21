import React from "react";
import styled from "styled-components";

interface IProps {
  type: string;
  number: string;
  validity: string;
  owner: string;
}

const Card = ({ type, number, validity, owner }: IProps) => {
  return (
    <CardContainer>
      <CardName>
        Next <span className={type}>{type}</span>
      </CardName>
      <CardChip />
      <CardNumber>{number}</CardNumber>
      <Box>
        <CardDate>{validity}</CardDate>
        <CardOwner>{owner}</CardOwner>
      </Box>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 520px;
  width: 100%;
  height: 320px;
  background: #3c0775;
  background: linear-gradient(157deg, #3c0775 0%, #54199c 48%, #8019cf 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  letter-spacing: 0.15rem;
`;

const CardName = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0rem;
  & span {
    font-weight: 500;
    text-transform: uppercase;
  }
  & span.gold {
    color: #fb5;
  }
  & span.platinum {
    color: #34f5ff;
  }
`;

const CardChip = styled.div`
  width: 64px;
  height: 64px;
  margin-left: 28px;
  background: #ccc;
  border-radius: 10px;
`;

const CardNumber = styled.p`
  text-align: center;
  font-size: 2.125rem;
  color: #fff;
  font-family: monospace;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardDate = styled.p`
  font-size: 1.25rem;
  font-family: monospace;
  &:before {
    content: "val ";
    text-transform: uppercase;
    color: #fff;
    top: 0px;
    left: 0px;
  }
`;

const CardOwner = styled.p`
  font-size: 1.75rem;
  font-family: monospace;
  text-transform: uppercase;
`;

export default Card;
