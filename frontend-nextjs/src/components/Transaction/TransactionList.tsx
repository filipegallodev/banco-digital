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
          <ul>
            {data.allTransactions?.map((transaction) => (
              <li key={transaction.id}>{transaction.value}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
