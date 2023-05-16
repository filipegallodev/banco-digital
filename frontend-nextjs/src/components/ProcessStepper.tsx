import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";

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
            <StepLabel
              sx={{
                "& .MuiSvgIcon-root": {
                  transform: "scale(1.5)",
                },
                "& .MuiStepLabel-label": {
                  fontSize: "1.35rem",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProcessStepper;
