import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import styled from "styled-components";
import useWindowWidth from "@/hooks/useWindowWidth";

interface IProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<any>>;
}

const LoanStepper = ({ steps, activeStep, setActiveStep }: IProps) => {
  const screenWidth = useWindowWidth();

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

export default LoanStepper;
