import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchTransactionsList } from "@/store/reducers/transactions";
import React, { useEffect } from "react";

const TransactionList = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.transactions
  );

  useEffect(() => {
    if (data?.allTransactions) return;
    dispatch(fetchTransactionsList());
  }, [dispatch, data]);

  if (loading) return <p>Buscando novas transferências...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <button onClick={() => dispatch(fetchTransactionsList())}>
        Atualizar transações
      </button>
      <div>
        {data && (
          <table>
            <thead>
              <tr>
                <th>Valor</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {data.allTransactions?.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.value}</td>
                  <td>TIPO</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
