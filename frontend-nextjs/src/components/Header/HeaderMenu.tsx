import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resetState } from "@/store/reducers/user";

const MenuItems = [
  { name: "Meu perfil", route: "/perfil" },
  { name: "Painel", route: "/painel" },
  { name: "Entrada e Saída", route: "/entrada-saida" },
  { name: "Transferências", route: "/transferencias" },
  { name: "Cartões", route: "/cartoes" },
  { name: "Investimentos", route: "/investimentos" },
  { name: "Empréstimos", route: "/emprestimos" },
  { name: "Sair da conta", route: "/logout" },
];

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget);
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

const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 6px;
  background-color: #fff;
  color: #000;
  font-size: 1.125rem;
  text-transform: capitalize;
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
  padding: 8px 16px;
  &.logout {
    color: #f55;
  }
`;

export default HeaderMenu;
