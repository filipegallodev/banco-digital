import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  clearFilters,
  filterTransactions,
} from "@/store/reducers/transactions";
import React, { useState } from "react";
import Input from "../Form/Input";

export interface IFilter {
  type: string;
  start: string;
  end: string;
}

const TransactionFilter = () => {
  const [filter, setFilter] = useState<IFilter>({
    type: "",
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
    setFilter({ type: "", start: "", end: "" });
    dispatch(clearFilters());
  }

  return (
    <div>
      <h3>Filtros</h3>
      <div>
        <h4>Tipo</h4>
        <select name="type" onChange={updateData}>
          <option value="received">Recebido</option>
          <option value="sent">Enviado</option>
        </select>
      </div>
      <div>
        <h4>Período</h4>
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
      </div>
      <button onClick={handleFilterCleaning}>Limpar filtros</button>
      <button onClick={() => dispatch(filterTransactions(filter))}>
        Filtrar
      </button>
    </div>
  );
};

export default TransactionFilter;
