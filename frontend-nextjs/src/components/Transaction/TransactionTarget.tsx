import React from "react";
import * as Styled from "@/components/styles/Components.styled";
import styled from "styled-components";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

interface IProps {
  label: string;
  id: string;
  formData: {
    value: string;
    target: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  editable?: boolean;
  [key: string]: any;
}

const TransactionTarget = ({
  label,
  id,
  formData,
  setFormData,
  editable = false,
  ...args
}: IProps) => {
  async function handeEmailPaste() {
    const target = await navigator.clipboard.readText();
    setFormData({
      ...formData,
      target:
        typeof target === "string" ? target.trim() : formData.target.trim(),
    });
  }

  return (
    <>
      <Styled.Label htmlFor={id}>{label}</Styled.Label>
      <Box>
        <Styled.Input
          type="text"
          id={id}
          name={id}
          value={formData.target}
          onChange={({ target }) =>
            setFormData({
              ...formData,
              target: target.value.trim(),
            })
          }
          {...args}
          autoFocus
        />
        {editable && <ContentPasteIconStyled onClick={handeEmailPaste} />}
      </Box>
    </>
  );
};

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentPasteIconStyled = styled(ContentPasteIcon)`
  &.MuiSvgIcon-root {
    color: ${(props) => props.theme.button.color};
    margin-bottom: 16px;
    font-size: 1.75rem;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
      color: ${(props) => props.theme.button.hover};
    }
  }
`;

export default TransactionTarget;
