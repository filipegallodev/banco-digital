import { useAppDispatch } from "@/hooks/useAppDispatch";
import { filterTransactions } from "@/store/reducers/transactions";
import React, { useState } from "react";

export interface IFilter {
  type?: string;
}

const TransactionFilter = () => {
  const [filter, setFilter] = useState<IFilter>();
  const dispatch = useAppDispatch();

  function updateDate(e: React.FormEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    if (!e.currentTarget.value) return;
    dispatch(filterTransactions({ type: e.currentTarget.value }));
  }

  return (
    <div>
      <h3>Filtros</h3>
      <div>
        <h4>Tipo</h4>
        <select name="type" onChange={updateDate}>
          <option value="received">Recebido</option>
          <option value="sent">Enviado</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilter;
