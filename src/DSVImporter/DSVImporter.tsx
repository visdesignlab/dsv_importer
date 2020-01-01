import React, {useState, createContext} from 'react';
import HeaderBar from './Components/HeaderBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import StepperComponent from './Components/StepperComponent';
import styles from './dsvimporter.module.css';
import Content from './Components/Content';
import {getSteps} from './Interfaces/Step';

export const DATA_SERVER_STRING =
  'http://us-central1-upset2-eaf80.cloudfunctions.net/api/';

export const MyContext = createContext({
  goBackOneStep: () => {},
  goToNextStep: () => {},
});

const DSVImporter: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const goToNextStep = () => setActiveStep(activeStep + 1);

  const goBackOneStep = () => setActiveStep(activeStep - 1);

  return (
    <div className={styles.layout_div}>
      <CssBaseline></CssBaseline>
      <HeaderBar></HeaderBar>
      <StepperComponent
        activeStep={activeStep}
        steps={steps}></StepperComponent>
      <MyContext.Provider value={{goToNextStep, goBackOneStep}}>
        <Content step={steps[activeStep].type}></Content>
      </MyContext.Provider>
    </div>
  );
};

export default DSVImporter;
