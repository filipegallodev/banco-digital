import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../styles/Components.styled";
import { currencyFormatter } from "@/helper/currencyFormatter";

interface IProps {
  loans: ILoan[] | undefined;
  maxItems: number;
  setMaxItems: React.Dispatch<React.SetStateAction<any>>;
}

const LoanTable = ({ loans, maxItems, setMaxItems }: IProps) => {
  if (!loans?.length)
    return (
      <Error>
        <p>Nenhum empréstimo encontrado.</p>
      </Error>
    );
  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <ColumnName>Valor</ColumnName>
              <ColumnName className="show850">Parcelamento</ColumnName>
              <ColumnName className="show1000">Total</ColumnName>
              <ColumnName>Solicitado</ColumnName>
              <ColumnName className="show650">ID</ColumnName>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <BodyLine key={loan.id}>
                <Value>{currencyFormatter(Number(loan.value))}</Value>
                <td className="show850">
                  {loan.installmentAmount}x de{" "}
                  {currencyFormatter(Number(loan.installmentValue))}
                </td>
                <td className="show1000">
                  {currencyFormatter(Number(loan.debt))}
                </td>
                <td>
                  {loan.requestedAt.replace(
                    /(\d{4})-(\d{2})-(\d{2})(\D{1})(\d{2}):(\d{2}):(\S+)/g,
                    `$3/$2/$1 às $5:$6`
                  )}
                </td>
                <td className="show650">
                  <LoanId>{loan.id}</LoanId>
                </td>
              </BodyLine>
            ))}
          </tbody>
        </Table>
        <Button
          onClick={() => setMaxItems(maxItems + 5)}
          disabled={loans.length < maxItems ? true : false}
        >
          {loans.length < maxItems ? "Fim dos empréstimos" : "Carregar mais"}
        </Button>
      </TableContainer>
    </Container>
  );
};

const Error = styled.div`
  width: 1200px;
  height: 344px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  margin-bottom: 24px;
  width: 100%;
  table-layout: fixed;
  text-align: center;
  border-spacing: 0px;
  border-radius: 6px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  @media (max-width: 1000px) {
    & .show1000 {
      display: none;
    }
  }
  @media (max-width: 850px) {
    & .show850 {
      display: none;
    }
  }
  @media (max-width: 650px) {
    & .show650 {
      display: none;
    }
  }
  @media (max-width: 500px) {
    & .show500 {
      display: none;
    }
  }
`;

const ColumnName = styled.th`
  font-size: 1.5rem;
  background-color: #fff;
  height: 72px;
  border-bottom: 2px solid #050505;
  padding: 0px 16px;
  text-transform: uppercase;
`;

const AppearAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: initial;
    transform: initial;
  }
`;

const BodyLine = styled.tr`
  font-size: 1.25rem;
  height: 72px;
  background: #fff;
  animation: ${AppearAnimation} 0.5s forwards;
  & td {
    padding: 0px 16px;
  }
`;

const Value = styled.td`
  &.negative {
    color: #f22;
  }
  &.positive {
    color: #2b2;
  }
`;

const LoanId = styled.span`
  font-size: 0.875rem;
`;

export default LoanTable;
