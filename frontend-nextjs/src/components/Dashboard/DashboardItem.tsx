import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  data: string | number;
  page?: string;
  type?: string;
}

const DashboardItem = ({ name, data, page, type }: IProps) => {
  const route = useRouter();
  const dataRef = useRef<HTMLParagraphElement>(null);

  function handleClick() {
    if (page) route.push(`/${page}`);
  }

  useEffect(() => {
    if (!(typeof data === "string")) return;
    if (!(type === "out/in")) return;
    if (data.includes("-R$") && dataRef) {
      return dataRef.current?.classList.add("negative");
    }
    return dataRef.current?.classList.add("positive");
  }, []);

  return (
    <Container onClick={handleClick}>
      <Name>{name}</Name>
      <Data ref={dataRef}>{data}</Data>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 4px #ce3ccc;
  }
`;

const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const Data = styled.p`
  font-size: 1.75rem;
  &.negative {
    color: #f22;
  }
  &.positive {
    color: #2b2;
  }
`;

export default DashboardItem;
