import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Typography } from "@mui/material";
import useWindowWidth from "@/hooks/useWindowWidth";

interface IProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<any>>;
  transactionData?: ITransactionFormData;
}

const TransactionStepper = ({
  steps,
  activeStep,
  setActiveStep,
  transactionData,
}: IProps) => {
  const screenWidth = useWindowWidth();

  function isStepFailed(step: number) {
    if (transactionData) {
      if (
        step === 0 &&
        activeStep > 0 &&
        transactionData &&
        !transactionData.value
      )
        return true;
      if (
        step === 1 &&
        activeStep > 1 &&
        transactionData &&
        !transactionData.target
      )
        return true;
    }
    return false;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={screenWidth >= 500 ? true : false}
        orientation={screenWidth >= 500 ? "horizontal" : "vertical"}
      >
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Campo obrigatório
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={label} onClick={() => setActiveStep(index)}>
              <StepLabelStyled sx={{ cursor: "pointer" }} {...labelProps}>
                {label}
              </StepLabelStyled>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

const StepLabelStyled = styled(StepLabel)`
  & .MuiSvgIcon-root {
    transform: scale(1.25);
    cursor: pointer;
    &.Mui-completed:not(.Mui-error) {
      color: #080;
    }
  }
  & .MuiStepLabel-label {
    font-size: 1.35rem;
    cursor: pointer;
  }
`;

export default TransactionStepper;
