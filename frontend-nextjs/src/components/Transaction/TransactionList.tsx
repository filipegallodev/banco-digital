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
    dispatch(fetchTransactionsList());
  }, [dispatch]);

  if (loading) return <p>Carregando transferências...</p>;
  if (error) return <p>{error}</p>;
  return <div>{data && <ul>
    {data.allTransactions?.map((transaction)=> (
      <li key={transaction.id}>{transaction.value}</li>
    ))}
    </ul>}</div>;
};

export default TransactionList;
