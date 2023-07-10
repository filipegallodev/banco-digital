import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resetState } from "@/store/reducers/user";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const MenuItems = [
  { name: "Meu perfil", route: "/perfil", icon: <AccountCircleRoundedIcon /> },
  { name: "Painel", route: "/painel", icon: <GridViewRoundedIcon /> },
  {
    name: "Entrada e Saída",
    route: "/entrada-saida",
    icon: <BarChartRoundedIcon />,
  },
  {
    name: "Transferências",
    route: "/transferencias",
    icon: <SwapHorizRoundedIcon />,
  },
  { name: "Cartões", route: "/cartoes", icon: <CreditCardRoundedIcon /> },
  {
    name: "Investimentos",
    route: "/investimentos",
    icon: <TrendingUpRoundedIcon />,
  },
  {
    name: "Empréstimos",
    route: "/emprestimos",
    icon: <BusinessCenterRoundedIcon />,
  },
  { name: "Sair da conta", route: "/logout", icon: <LogoutRoundedIcon /> },
];

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Container>
      <ButtonStyled
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
        Menu
      </ButtonStyled>
      <MenuStyled
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {MenuItems.map((item) => {
          if (
            item.name === "Sair da conta" ||
            item.name === "Entrada e Saída"
          ) {
            return (
              <div key={item.name}>
                <Divider />
                <MenuItemStyled
                  onClick={() =>
                    item.route === "/logout"
                      ? dispatch(resetState()) && router.push("/")
                      : router.push(item.route)
                  }
                  className={item.name === "Sair da conta" ? "logout" : ""}
                >
                  {item.icon}
                  {item.name}
                </MenuItemStyled>
              </div>
            );
          }
          return (
            <MenuItemStyled
              key={item.name}
              onClick={() => router.push(item.route)}
            >
              {item.icon}
              {item.name}
            </MenuItemStyled>
          );
        })}
      </MenuStyled>
    </Container>
  );
};

const Container = styled.div`
  & .MuiPopover-root {
    background: none;
  }
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: 0.1s;
  color: #000;
  font-size: 1.25rem;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.button.color};
  }
`;

const MenuStyled = styled(Menu)`
  & .MuiList-root {
    width: 240px;
  }
`;

const MenuItemStyled = styled(MenuItem)`
  display: flex;
  align-items: center;
  gap: 8px;
  &.MuiButtonBase-root {
    padding: 8px 16px;
  }
  &.logout {
    color: #f55;
  }
`;

export default HeaderMenu;
