import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

const benefits = [
  {
    text: "Seguro Proteção de Preço",
    gold: true,
    platinum: false,
  },
  {
    text: "Garantia estendida original",
    gold: true,
    platinum: false,
  },
  {
    text: "Seguro Proteção de Compras",
    gold: true,
    platinum: false,
  },
  {
    text: "Ofertas Internacionais",
    gold: false,
    platinum: true,
  },
  {
    text: "Seguro de emergências em viagens",
    gold: false,
    platinum: true,
  },
  {
    text: "Seguro de Automóveis",
    gold: false,
    platinum: true,
  },
  {
    text: "Redução de juros nas parcelas",
    gold: false,
    platinum: true,
  },
];

const CardBenefits = () => {
  return (
    <Container>
      <AccordionStyled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AccordionName>Benefícios</AccordionName>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <thead>
              <TableHeadRow>
                <th>Benefício</th>
                <th>Gold</th>
                <th>Platinum</th>
              </TableHeadRow>
            </thead>
            <tbody>
              {benefits.map((benefit, index) => (
                <TableBodyRow key={index}>
                  <td>{benefit.text}</td>
                  <td className={benefit.gold ? "include" : "not-include"}>
                    {benefit.gold ? "Sim" : "Não"}
                  </td>
                  <td className={benefit.platinum ? "include" : "not-include"}>
                    {benefit.platinum ? "Sim" : "Não"}
                  </td>
                </TableBodyRow>
              ))}
            </tbody>
          </Table>
        </AccordionDetails>
      </AccordionStyled>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0px;
  width: 100%;
`;

const AccordionStyled = styled(Accordion)`
  &.MuiPaper-root {
    max-width: 600px;
    width: 100%;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    transition: 0.1s;
    &:hover {
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    }
  }
`;

const AccordionName = styled.span`
  font-size: 1.25rem;
  color: #000;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: center;
  overflow: hidden;
`;

const TableHeadRow = styled.tr`
  font-size: 1.25rem;
  height: 72px;
  @media (max-width: 500px) {
    font-size: 1.125rem;
  }
`;

const TableBodyRow = styled.tr`
  font-size: 1.125rem;
  height: 72px;
  background: #fff;
  & td {
    padding: 0px 16px;
    &.include {
      color: #2b2;
    }
    &.not-include {
      color: #f22;
    }
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    height: 120px;
  }
`;

export default CardBenefits;
