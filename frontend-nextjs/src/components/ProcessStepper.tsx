import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import styled from "styled-components";

interface IProps {
  steps: string[];
  activeStep: number;
}

const ProcessStepper = ({ steps, activeStep }: IProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabelStyled>{label}</StepLabelStyled>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const StepLabelStyled = styled(StepLabel)`
  & .MuiSvgIcon-root {
    transform: scale(1.5);
    &.Mui-completed {
      color: #080;
    }
  }
  & .MuiStepLabel-label {
    font-size: 1.35rem;
  }
`;

export default ProcessStepper;
