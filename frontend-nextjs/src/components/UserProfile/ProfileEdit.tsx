import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import * as Styled from "../styles/Components.styled";
import Input from "../Form/Input";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserUpdate } from "@/store/reducers/user";

const ProfileEdit = () => {
  const user = useAppSelector((state: IReduxState) => state.user.data?.user);
  const [formData, setFormData] = useState<IUserUpdateFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    accountId: user?.accountId || 0,
    birth: "",
    phoneNumber: "",
    city: "",
    state: "",
    income: "",
    job: "",
  });
  const dispatch = useAppDispatch();

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
              placeholder={""}
            />
            <Input
              name="Telefone"
              id="edit-phone-number"
              type="tel"
              formData={formData}
              saveFormData={setFormData}
              placeholder={""}
            />
          </div>
          <div>
            <h3>Endereço</h3>
            <Input
              name="Cidade"
              id="edit-city"
              formData={formData}
              saveFormData={setFormData}
              placeholder={""}
            />
            <Input
              name="Estado"
              id="edit-state"
              formData={formData}
              saveFormData={setFormData}
              placeholder={""}
            />
          </div>
          <div>
            <h3>Financeiro</h3>
            <Input
              name="Renda"
              id="edit-income"
              formData={formData}
              saveFormData={setFormData}
              placeholder={""}
            />
            <Input
              name="Emprego"
              id="edit-job"
              formData={formData}
              saveFormData={setFormData}
              placeholder={""}
            />
          </div>
          <Styled.Button>Salvar</Styled.Button>
        </Styled.Form>
      </Styled.FormContainer>
    </div>
  );
};

export default ProfileEdit;
