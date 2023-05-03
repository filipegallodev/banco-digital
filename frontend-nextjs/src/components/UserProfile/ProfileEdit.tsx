import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import * as Styled from "../styles/Components.styled";
import Input from "../Form/Input";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserUpdate } from "@/store/reducers/user";
import Success from "../Status/Success";
import Error from "../Status/Error";
import { CircularProgress } from "@mui/material";

const ProfileEdit = () => {
  const { data, loading, error } = useAppSelector(
    (state: IReduxState) => state.user
  );
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
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

  function handleUserUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (formData) {
      dispatch(fetchUserUpdate(formData));
    }
  }

  return (
    <div className="animeRight">
      <Styled.SubTitle>Editar informações</Styled.SubTitle>
      <Styled.FormContainer>
        <Styled.Form onSubmit={handleUserUpdate}>
          <div>
            <h3>Básico</h3>
            <Input
              name="Nome"
              id="edit-first-name"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.firstName}
              disabled
            />
            <Input
              name="Sobrenome"
              id="edit-last-name"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.lastName}
              disabled
            />
            <Input
              name="E-mail"
              id="edit-username"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.username}
              disabled
            />
            <Input
              name="Data de nascimento"
              id="edit-birth"
              type="date"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.birth}
            />
            <Input
              name="Telefone"
              id="edit-phone-number"
              type="tel"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.phoneNumber}
            />
          </div>
          <div>
            <h3>Endereço</h3>
            <Input
              name="Cidade"
              id="edit-city"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.city}
            />
            <Input
              name="Estado"
              id="edit-state"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.state}
            />
          </div>
          <div>
            <h3>Financeiro</h3>
            <Input
              name="Renda"
              id="edit-income"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.income}
            />
            <Input
              name="Emprego"
              id="edit-job"
              formData={formData}
              saveFormData={setFormData}
              placeholder={user?.job}
            />
          </div>
          <Styled.ButtonContainer>
            <Styled.Button disabled={loading}>
              {loading ? "Salvando" : "Salvar"}
            </Styled.Button>
            {loading && <CircularProgress />}
          </Styled.ButtonContainer>
          <Success message={data?.status} />
          <Error message={error} />
        </Styled.Form>
      </Styled.FormContainer>
    </div>
  );
};

export default ProfileEdit;
