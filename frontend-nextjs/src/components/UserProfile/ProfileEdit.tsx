import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import * as Styled from "../styles/Components.styled";
import Input from "../Form/Input";
import { clearStatus, fetchUserUpdate } from "@/store/reducers/user";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";

const ProfileEdit = () => {
  const { loading } = useAppSelector(
    (state: IReduxState) => state.user
  );
  const user = useAppSelector((state: IReduxState) => state.user.data.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IUserUpdateFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    accountId: user?.accountId || "",
    birth: user?.birth || "",
    phoneNumber: user?.phoneNumber || "",
    city: user?.city || "",
    state: user?.state || "",
    income: user?.income || "",
    job: user?.job || "",
  });

  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);

  function handleUserUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (formData) {
      dispatch(fetchUserUpdate(formData));
    }
  }

  return (
    <Container className="animeRight">
      <Styled.SubTitle>Editar informações</Styled.SubTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleUserUpdate}>
          <div>
            <Styled.ThirdTitle>Básico</Styled.ThirdTitle>
            <Input
              name="Nome"
              id="edit-first-name"
              formData={formData}
              saveFormData={setFormData}
              value={formData.firstName}
              disabled
            />
            <Input
              name="Sobrenome"
              id="edit-last-name"
              formData={formData}
              saveFormData={setFormData}
              value={formData.lastName}
              disabled
            />
            <Input
              name="E-mail"
              id="edit-username"
              formData={formData}
              saveFormData={setFormData}
              value={formData.username.replace(
                /(\w+)(\w{4}\@\D+)/g,
                "$1************"
              )}
              eyeToDisplay={true}
              disabled
            />
            <Input
              name="Data de nascimento"
              id="edit-birth"
              type="date"
              formData={formData}
              saveFormData={setFormData}
              value={formData.birth}
            />
            <Input
              name="Telefone celular"
              id="edit-phoneNumber"
              type="tel"
              placeholder="(00) 00000-0000"
              formData={formData}
              saveFormData={setFormData}
              value={formData.phoneNumber}
            />
          </div>
          <div>
            <Styled.ThirdTitle>Endereço</Styled.ThirdTitle>
            <Input
              name="Cidade"
              id="edit-city"
              formData={formData}
              saveFormData={setFormData}
              value={formData.city}
            />
            <Input
              name="Estado"
              id="edit-state"
              formData={formData}
              saveFormData={setFormData}
              value={formData.state}
            />
          </div>
          <div>
            <Styled.ThirdTitle>Financeiro</Styled.ThirdTitle>
            <Styled.Label>Renda</Styled.Label>
            <Styled.CurrencyInputContainer>
              <CurrencyInput
                id="income-value"
                name="income-value"
                placeholder="R$ 0,00"
                prefix="R$ "
                decimalsLimit={2}
                value={formData.income}
                onValueChange={(value) =>
                  setFormData({ ...formData, income: value })
                }
              />
            </Styled.CurrencyInputContainer>
            <Input
              name="Emprego"
              id="edit-job"
              formData={formData}
              saveFormData={setFormData}
              value={formData.job}
            />
          </div>
          <Styled.ButtonContainer>
            <Styled.Button disabled={loading}>
              {loading ? "Salvando" : "Salvar"}
            </Styled.Button>
            {loading && <CircularProgress />}
          </Styled.ButtonContainer>
        </Styled.Form>
      </Styled.FormContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

export default ProfileEdit;
