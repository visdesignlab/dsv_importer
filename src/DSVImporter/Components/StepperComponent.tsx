//@ts-nocheck
import React, {FC} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import gray from '@material-ui/core/colors/grey';
import {Steps} from '../Interfaces/Step';

interface Props {
  activeStep: number;
  steps: Steps;
}

const StepperComponent: FC<Props> = ({activeStep, steps}: Props) => {
  const classes = useStyles();

  steps = steps.slice(0, 3);

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={`${step.label}${index}`}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default StepperComponent;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepper: {
      backgroundColor: gray[50],
    },
  }),
);
