import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserDelete } from "@/store/reducers/user";
import { useRouter } from "next/router";
import React from "react";

const ProfileManage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleUserDelete() {
    dispatch(fetchUserDelete());
    router.reload();
  }

  return (
    <div className="animeRight">
      <h2>Gerenciar perfil</h2>
      <button onClick={handleUserDelete}>Excluir</button>
    </div>
  );
};

export default ProfileManage;
