import { useAppDispatch } from "@/hooks/useAppDispatch";
import React, { useState } from "react";
import Input from "../Form/Input";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";
import { clearLoanFilters, filterLoans } from "@/store/reducers/loan";

interface IProps {
  setMaxItems: React.Dispatch<React.SetStateAction<any>>;
}

const LoanFilter = ({ setMaxItems }: IProps) => {
  const [filter, setFilter] = useState<ILoanFilter>({
    start: "",
    end: "",
  });
  const dispatch = useAppDispatch();

  function handleFilterCleaning() {
    setFilter({ start: "", end: "" });
    dispatch(clearLoanFilters());
    setMaxItems(5);
  }

  return (
    <>
      <Styled.SubTitle>Filtros</Styled.SubTitle>
      <Styled.Text>
        Você pode filtrar por data, mas não é necessário preencher as duas
        datas.
      </Styled.Text>
      <Container>
        <div>
          <Styled.ThirdTitle>Período</Styled.ThirdTitle>
          <DateContainer>
            <Input
              id="filter-start"
              type="date"
              placeholder="dd/mm/aaaa"
              formData={filter}
              saveFormData={setFilter}
              value={filter.start}
            />
            <p>até</p>
            <Input
              id="filter-end"
              type="date"
              placeholder="dd/mm/aaaa"
              formData={filter}
              saveFormData={setFilter}
              value={filter.end}
            />
          </DateContainer>
        </div>
      </Container>
      <Styled.ButtonContainer>
        <Styled.Button onClick={handleFilterCleaning} className="secondary">
          Limpar filtros
        </Styled.Button>
        <Styled.Button onClick={() => dispatch(filterLoans(filter))}>
          Filtrar
        </Styled.Button>
      </Styled.ButtonContainer>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 1240px) {
    display: flex;
    flex-direction: column;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  & div {
    margin: 0;
  }
  & p {
    font-size: 1.25rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default LoanFilter;
