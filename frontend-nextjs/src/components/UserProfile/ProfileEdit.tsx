import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import * as Styled from "../styles/Components.styled";
import Input from "../Form/Input";
import { clearUserStatus, fetchUserUpdate } from "@/store/reducers/user";
import { CircularProgress } from "@mui/material";
import UserPhoneInput from "../Form/UserPhoneInput";

const ProfileEdit = () => {
  const { loading } = useAppSelector((state) => state.user);
  const user = useAppSelector((state) => state.user.data.user);
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
    dispatch(clearUserStatus());
  }, [dispatch]);

  function handleUserUpdate(event: React.FormEvent) {
    event.preventDefault();
    dispatch(fetchUserUpdate(formData));
  }

  return (
    <div className="animeRight">
      <Styled.SubTitle>Editar informações</Styled.SubTitle>
      <Styled.Text>
        Você pode alterar as informações que desejar, exceto os campos que estão
        desativados.
      </Styled.Text>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleUserUpdate}>
          <div>
            <Styled.ThirdTitle>Básico</Styled.ThirdTitle>
            <Input
              label="Nome"
              id="edit-first-name"
              formData={formData}
              saveFormData={setFormData}
              value={formData.firstName}
              disabled
            />
            <Input
              label="Sobrenome"
              id="edit-last-name"
              formData={formData}
              saveFormData={setFormData}
              value={formData.lastName}
              disabled
            />
            <Input
              label="E-mail"
              id="edit-username"
              formData={formData}
              saveFormData={setFormData}
              value={formData.username}
              eyeToDisplay={true}
              disabled
            />
            <Input
              label="Data de nascimento"
              id="edit-birth"
              type="date"
              formData={formData}
              saveFormData={setFormData}
              value={formData.birth}
            />
            <UserPhoneInput formData={formData} saveFormData={setFormData} />
          </div>
          <div>
            <Styled.ThirdTitle>Endereço</Styled.ThirdTitle>
            <Input
              label="Cidade"
              id="edit-city"
              formData={formData}
              saveFormData={setFormData}
              value={formData.city}
            />
            <Input
              label="Estado"
              id="edit-state"
              formData={formData}
              saveFormData={setFormData}
              value={formData.state}
            />
          </div>
          <div>
            <Styled.ThirdTitle>Financeiro</Styled.ThirdTitle>
            <Styled.Label>Renda</Styled.Label>
            <Styled.CurrencyInputStyled
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
            <Input
              label="Profissão"
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
    </div>
  );
};

export default ProfileEdit;
