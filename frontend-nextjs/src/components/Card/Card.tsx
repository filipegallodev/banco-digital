import React from "react";
import styled from "styled-components";
import ChipImg from "@/../public/chip.png";
import Image from "next/image";

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
      <Image src={ChipImg} width={72} height={72} alt="Chip do Cartão" />
      <CardNumber>{number}</CardNumber>
      <Box>
        <CardOwner>{owner}</CardOwner>
        <CardDate>{validity}</CardDate>
      </Box>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: 320px;
  background: rgb(11, 0, 92);
  background: linear-gradient(
    145deg,
    rgba(11, 0, 92, 1) 0%,
    rgba(40, 25, 156, 1) 48%,
    rgba(115, 40, 255, 1) 100%
  );
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
  font-size: 2.35rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
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
  font-size: 1.5rem;
  font-family: monospace;
  text-transform: uppercase;
`;

export default Card;
