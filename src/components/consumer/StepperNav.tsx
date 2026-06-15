import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';

interface Step {
  id: string;
  label: string;
  stepNo: number;
}

interface StepperNavProps {
  steps: Step[];
  currentStepNo: number;
  completedStepIds: string[];
}

const StepperNav: React.FC<StepperNavProps> = ({ steps, currentStepNo, completedStepIds }) => {
  const activeIndex = steps.findIndex(s => s.stepNo === currentStepNo);

  return (
    <Box component="nav" aria-label="Progress" sx={{ width: '100%', py: 2 }}>
      <Stepper
        activeStep={activeIndex}
        connector={<StepConnector />}
        alternativeLabel
      >
        {steps.map((step) => {
          const isCompleted = completedStepIds.includes(step.id);
          const isCurrent = step.stepNo === currentStepNo;

          return (
            <Step
              key={step.id}
              completed={isCompleted}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <StepLabel
                slotProps={{
                  label: { style: { marginTop: 4 } },
                }}
                sx={{ '& .MuiStepLabel-label': { fontWeight: isCurrent ? 700 : 400 }, '& .MuiStepLabel-label.Mui-active': { fontWeight: 700 }, '& .MuiStepLabel-label.Mui-completed': { fontWeight: 600 } }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25 }}>
                  <Typography variant="body2" sx={{ fontWeight: isCurrent ? 700 : isCompleted ? 600 : 400 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" color={isCompleted ? 'success.main' : isCurrent ? 'primary.main' : 'text.disabled'} sx={{ fontWeight: 500 }}>
                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default StepperNav;