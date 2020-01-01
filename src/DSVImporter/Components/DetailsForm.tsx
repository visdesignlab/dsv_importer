import React, {FC, useState, ChangeEvent, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {DatasetInfo, isValidEmail} from '../Interfaces/DatasetInfo';

interface Props {
  datasetInfo: DatasetInfo;
  handleFormSubmission: (info: DatasetInfo) => void;
  uploadComplete: boolean;
}

const DetailsForm: FC<Props> = ({
  datasetInfo,
  handleFormSubmission,
  uploadComplete,
}: Props) => {
  const [di, setDi] = useState<DatasetInfo>(datasetInfo);
  const [firstError, setFirstError] = useState(true);
  const [emailError, setEmailError] = useState(false);

  const email = di.email;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isValidEmail(di.email)) {
      setEmailError(true);
      setFirstError(false);
      return;
    } else {
      handleFormSubmission(di);
    }
  };

  useEffect(() => {
    if (!firstError) setEmailError(!isValidEmail(email));
  }, [firstError, email]);

  return (
    <Grid container justify="center" alignItems="center">
      <form style={{display: 'table'}} onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center">
          <Grid style={{width: '75%'}} container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, username: event.target.value});
                }}
                value={di.username}
                required
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, email: event.target.value});
                }}
                required
                value={di.email}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                helperText={emailError ? 'Please enter a valid email id.' : ''}
                error={emailError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, name: event.target.value});
                }}
                required
                value={di.name}
                id="dataset-name"
                name="dataset-name"
                label="Dataset Name"
                variant="outlined"
                placeholder="Name of the dataset"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, author: event.target.value});
                }}
                value={di.author}
                id="author"
                name="author"
                label="Author"
                variant="outlined"
                placeholder="Organizations/Persons"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, source: event.target.value});
                }}
                value={di.source}
                id="source"
                name="source"
                label="Source"
                variant="outlined"
                placeholder="URL/Name if applicable"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event: ChangeEvent<{value: string}>) => {
                  setDi({...di, description: event.target.value});
                }}
                value={di.description}
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                placeholder="Please describe the dataset"
                multiline
                rows="4"
                fullWidth></TextField>
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button
                disabled={uploadComplete}
                type="submit"
                variant="contained"
                color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default DetailsForm;
