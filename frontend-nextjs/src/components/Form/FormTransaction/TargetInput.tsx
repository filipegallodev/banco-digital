import React from "react";

interface IProps {
  label: string;
  id: string;
  formData: {
    value: string;
    target: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  [key: string]: any;
}

const ValueInput = ({ label, id, formData, setFormData, ...args }: IProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        value={formData.target}
        onChange={({ target }) =>
          setFormData({
            ...formData,
            target: target.value,
          })
        }
        {...args}
      />
    </>
  );
};

export default ValueInput;
