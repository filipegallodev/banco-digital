import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  clearFilters,
  filterTransactions,
} from "@/store/reducers/transactions";
import React, { useState } from "react";
import Input from "../Form/Input";
import * as Styled from "../styles/Components.styled";
import styled from "styled-components";

interface IProps {
  setMaxItems: React.Dispatch<React.SetStateAction<any>>;
}

const TransactionFilter = ({ setMaxItems }: IProps) => {
  const [filter, setFilter] = useState<ITransactionFilter>({
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
          <Styled.Select name="type" onChange={updateData} value={filter.type}>
            <option value="all">Tudo</option>
            <option value="received">Recebido</option>
            <option value="sent">Enviado</option>
          </Styled.Select>
        </div>
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
        <Styled.Button onClick={() => dispatch(filterTransactions(filter))}>
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

export default TransactionFilter;
