import React from "react";
import { useRouter } from "next/router";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import styled from "styled-components";

interface IProps {
  styleClass?: string;
}

const Logo = ({ styleClass }: IProps) => {
  const router = useRouter();

  return (
    <LogoContainer className={styleClass}>
      <AccountBalanceIconStyled />
      <TitleContainer>
        <Title onClick={() => !styleClass && router.push("/painel")}>
          <span>Next</span>Bank
        </Title>
        <SubTitle>Banco Digital</SubTitle>
      </TitleContainer>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #eef;
  cursor: pointer;
  &.black {
    color: #3a2b5a;
    cursor: default;
  }
  &.large {
    transform: scale(1.5);
  }
`;

const AccountBalanceIconStyled = styled(AccountBalanceIcon)`
  font-size: 3.75rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 2.25rem;
  & span {
    color: #6113fd;
  }
`;

const SubTitle = styled.span`
  font-weight: 500;
  font-size: 1.25rem;
`;

export default Logo;
