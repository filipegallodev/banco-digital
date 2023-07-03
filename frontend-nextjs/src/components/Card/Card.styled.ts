import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
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
  @media (max-width: 520px) {
    height: 300px;
  }
  @media (max-width: 450px) {
    height: 260px;
  }
  @media (max-width: 390px) {
    height: 240px;
  }
`;

export const NameBox = styled.div`
  display: flex;
  justify-content: space-between;
  & svg {
    cursor: pointer;
  }
`;

export const CardName = styled.span`
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
  @media (max-width: 520px) {
    font-size: 2rem;
  }
  @media (max-width: 390px) {
    font-size: 1.75rem;
  }
`;

export const ImageAndCvvBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageStyled = styled(Image)`
  @media (max-width: 520px) {
    width: 64px;
    height: 64px;
  }
  @media (max-width: 450px) {
    width: 56px;
    height: 56px;
  }
  @media (max-width: 390px) {
    width: 48px;
    height: 48px;
  }
`;

export const CardCvv = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
  font-family: monospace;
`;

export const CardNumber = styled.span`
  text-align: center;
  font-size: 2.125rem;
  color: #fff;
  font-family: monospace;
  @media (max-width: 520px) {
    font-size: 1.75rem;
  }
  @media (max-width: 450px) {
    font-size: 1.35rem;
  }
  @media (max-width: 390px) {
    font-size: 1.125rem;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardDate = styled.span`
  font-size: 1.25rem;
  font-family: monospace;
  &:before {
    content: "val ";
    text-transform: uppercase;
    color: #fff;
    top: 0px;
    left: 0px;
  }
  @media (max-width: 520px) {
    font-size: 0.875rem;
  }
  @media (max-width: 390px) {
    font-size: 0.750rem;
  }
`;

export const CardOwner = styled.span`
  font-size: 1.5rem;
  font-family: monospace;
  text-transform: uppercase;
  @media (max-width: 520px) {
    font-size: 1rem;
  }
  @media (max-width: 390px) {
    font-size: 0.9rem;
  }
`;
