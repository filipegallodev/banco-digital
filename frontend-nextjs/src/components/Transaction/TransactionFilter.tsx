import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  clearFilters,
  filterTransactions,
} from "@/store/reducers/transactions";
import React, { useState } from "react";
import Input from "../Form/Input";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";

export interface IFilter {
  type: string;
  start: string;
  end: string;
}

interface IProps {
  setMaxItems: React.Dispatch<React.SetStateAction<any>>;
}

const TransactionFilter = ({ setMaxItems }: IProps) => {
  const [filter, setFilter] = useState<IFilter>({
    type: "all",
    start: "",
    end: "",
  });
  const dispatch = useAppDispatch();

  function updateData(e: React.FormEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleFilterCleaning() {
    setFilter({ type: "all", start: "", end: "" });
    dispatch(clearFilters());
    setMaxItems(5);
  }

  return (
    <>
      <Styled.SubTitle>Filtros</Styled.SubTitle>
      <Styled.Text>
        Você pode filtrar por tipo, por data ou pelos dois, não é necessário
        preencher as duas datas.
      </Styled.Text>
      <Container>
        <div>
          <Styled.ThirdTitle>Tipo</Styled.ThirdTitle>
          <SelectStyled name="type" onChange={updateData} value={filter.type}>
            <option value="all">Tudo</option>
            <option value="received">Recebido</option>
            <option value="sent">Enviado</option>
          </SelectStyled>
        </div>
        <div>
          <Styled.ThirdTitle>Período</Styled.ThirdTitle>
          <DateContainer>
            <Input
              name="De"
              id="filter-start"
              type="date"
              formData={filter}
              saveFormData={setFilter}
              value={filter.start}
            />
            <Input
              name="Até"
              id="filter-end"
              type="date"
              formData={filter}
              saveFormData={setFilter}
              value={filter.end}
            />
          </DateContainer>
        </div>
      </Container>
      <Styled.ButtonContainer>
        <Styled.Button onClick={handleFilterCleaning}>
          Limpar filtros
        </Styled.Button>
        <Styled.Button onClick={() => dispatch(filterTransactions(filter))}>
          Filtrar
        </Styled.Button>
      </Styled.ButtonContainer>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 25% 1fr;
  gap: 32px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  & div {
    margin: 0;
  }
`;

const SelectStyled = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.125rem;
  transition: 0.1s;
  &:enabled:not(&:focus):hover {
    box-shadow: 0px 0px 0px 2px #aaa;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px #f200ff;
    outline: none;
    border-inline: 0px;
  }
`;

export default TransactionFilter;
