import React from "react";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardItem from "@/components/Dashboard/DashboardItem";
import DashboardMainItem from "@/components/Dashboard/DashboardMainItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import styled from "styled-components";

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
        icon={<SavingsRoundedIcon />}
      />
      <DashboardContainer>
        <DashboardItem
          name="Entrada e Saída"
          page="entrada-saida"
          data={transactions.data?.totalTransferValue.total}
          loading={transactions.loading}
          icon={<BarChartRoundedIcon />}
        />
        <DashboardItem
          name="Transferências"
          data={String(transactions.data?.allTransactions?.length || 0)}
          page="transferencias"
          loading={transactions.loading}
          icon={<SwapHorizRoundedIcon />}
        />
        <DashboardItem
          name="Cartões"
          data={String(card.data.cards?.length ? card.data.cards?.length : 0)}
          page="cartoes"
          loading={transactions.loading}
          icon={<CreditCardRoundedIcon />}
        />
      </DashboardContainer>
      <Box>
        <DashboardItem
          name="Investimentos"
          data={"0"}
          page="investimentos"
          loading={transactions.loading}
          icon={<TrendingUpRoundedIcon />}
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
          icon={<BusinessCenterRoundedIcon />}
        />
      </Box>
    </>
  );
};

const Box = styled.div`
  margin: 16px 0px 32px 0px;
  width: 100%;
  display: flex;
  gap: 16px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default Dashboard;
