import React from "react";

interface IProps {
  field: string;
  data: string | undefined;
}

const UserInfo = ({ field, data }: IProps) => {
  return (
    <p>
      <strong>{field}:</strong> {data}
    </p>
  );
};

export default UserInfo;
