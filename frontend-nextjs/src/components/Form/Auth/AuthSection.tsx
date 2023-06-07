import React, { useState } from "react";
import * as Styled from "../../styles/Components.styled";
import FormLogin from "../../Form/Auth/FormLogin";
import FormRegister from "../../Form/Auth/FormRegister";
import styled from "styled-components";

const AuthSection = () => {
  const [form, setForm] = useState<string>("login");

  return (
    <Section>
      <Styled.SubTitle>O que deseja fazer?</Styled.SubTitle>
      <Styled.ButtonContainer>
        <Styled.Button
          onClick={() => setForm("login")}
          disabled={form === "login"}
        >
          Fazer login
        </Styled.Button>
        <Styled.Button
          onClick={() => setForm("register")}
          disabled={form === "register"}
        >
          Criar uma conta
        </Styled.Button>
      </Styled.ButtonContainer>
      {form === "login" ? (
        <FormLogin />
      ) : form === "register" ? (
        <FormRegister />
      ) : null}
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
`;

export default AuthSection;
