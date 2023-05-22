import React, { useState } from "react";

export interface IFilter {
  type?: string;
}

const TransactionFilter = () => {
  const [filter, setFilter] = useState<IFilter>();

  function updateDate(e: React.FormEvent<HTMLSelectElement>) {
    setFilter({
      ...filter,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleFilterSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div>
      <h3>Filtros</h3>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <h4>Tipo</h4>
          <select name="type" onChange={updateDate}>
            <option value="received">Recebido</option>
            <option value="sent">Enviado</option>
          </select>
        </div>
        <button>Filtrar</button>
      </form>
    </div>
  );
};

export default TransactionFilter;
