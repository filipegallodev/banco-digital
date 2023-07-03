import React from "react";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardItem from "@/components/Dashboard/DashboardItem";
import DashboardMainItem from "@/components/Dashboard/DashboardMainItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import SavingsIcon from "@mui/icons-material/Savings";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transactions);
  const card = useAppSelector((state) => state.card);

  return (
    <>
      <DashboardMainItem
        name="Saldo"
        data={user.data.user?.balance}
        loading={user.loading}
        className="main"
        icon={<SavingsIcon />}
      />
      <DashboardContainer>
        <DashboardItem
          name="Entrada e Saída"
          page="entrada-saida"
          data={transactions.data?.totalTransferValue.total}
          loading={transactions.loading}
        />
        <DashboardItem
          name="Transferências"
          data={String(transactions.data?.allTransactions?.length || 0)}
          page="transferencias"
          loading={transactions.loading}
        />
        <DashboardItem
          name="Cartões"
          data={String(card.data.cards?.length ? card.data.cards?.length : 0)}
          page="cartoes"
          loading={transactions.loading}
        />
        <DashboardItem
          name="Investimentos"
          data={"0"}
          page="investimentos"
          loading={transactions.loading}
        />
        <DashboardItem
          name="Empréstimos"
          prefix={user.data.user?.loan === "R$ 0,00" ? "" : "até"}
          page="emprestimos"
          data={
            user.data.user?.loan === "R$ 0,00"
              ? "Indisponível"
              : user.data.user?.loan
          }
          loading={transactions.loading}
        />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
