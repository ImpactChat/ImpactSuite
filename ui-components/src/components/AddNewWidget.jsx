import React from 'react';
import { render } from 'react-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';


import { Divider } from '@material-ui/core';

import { getCookie, CSRFToken } from './CSRFToken.jsx';

import '../i18n/i18n.js';


export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
             
}));
function getSteps() {
    return ['Upload', 'Proccess', 'Create'];
}  

function getStepContent(step) {
    switch (step) {
      case 0:
        return `Upload a file to the server`;
      case 1:
        return 'The server is proccessing your file.';
      case 2:
        return `The server is creating the models from your file`;
      default:
        return 'Unknown step';
    }
}
  

export default function AddNew(props) {
    const classes = useStyles();

    const [lang, setLang] = React.useState(window.props.curlang);
    const [progress, setProgress] = React.useState(0);

    const handleChange = (event) => {
        setLang(event.target.value);
    };
  

    const handleSubmit = (e) => {
        e.preventDefault();

        handleReset();

        var formElement = document.querySelector("form");
        var formData = new FormData(formElement);
        var request = new XMLHttpRequest();
        request.addEventListener("load", handleResponse);
        request.upload.addEventListener("progress", progressFunction, false);  
        request.addEventListener("progress", notLoadprogressFunction);
        request.addEventListener("loadend", loadendprogressFunction);  

        request.open("POST", props.url);
        request.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
        request.send(formData);
    };

    const handleResponse = (res) => {
        console.log("done")
        console.log(res);
        console.log(res.target.response);
        handleNext();
    };
    const [activeStep, setActiveStep] = React.useState(0);

    const progressFunction = (evt) => {  
        console.log("progress")
        if (evt.lengthComputable) {  
          setProgress(Math.round(evt.loaded / evt.total * 100));
        }
        if (Math.round(evt.loaded / evt.total * 100) === 100 && activeStep === 0)
        {
            handleNext();
        }
    };

    const notLoadprogressFunction = (evt) => {  
        console.log("notLoadprogressFunction")
    };
    const loadendprogressFunction = (evt) => {  
        console.log("loadendprogressFunction")
    };

      
    
    const { t, i18n } = useTranslation();

    const steps = getSteps();
    const handleNext = () => {
        console.log("next")
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };
    
  

    return (
        <>
            <form id="form">
                <input type="file" name="fileupload" id="fileupload" />
                <Button onClick={handleSubmit} variant="outlined" color="default">
                Submit
                </Button>
            </form>
             <LinearProgress variant="determinate" value={progress} />

             <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>

        </>
    );
}