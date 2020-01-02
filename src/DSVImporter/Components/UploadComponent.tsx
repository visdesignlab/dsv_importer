import React, {FC, useState, ChangeEvent} from 'react';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Separators} from '../Interfaces/Separator';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

interface Props {
  selectedSeparator: Separators;
  setSeparator: (sep: Separators) => void;
  handleFileUpload: (file: File) => void;
}

const UploadComponent: FC<Props> = ({
  setSeparator,
  selectedSeparator,
  handleFileUpload,
}: Props) => {
  const classes = useStyles({});

  const [file, setFile] = useState<File>(null as any);

  return (
    <Grid
      className={classes.root}
      container
      justify="center"
      alignItems="center"
      spacing={3}>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="file-upload"></InputLabel>
          <Input
            id="file-upload"
            type="file"
            onChange={(event: any) => {
              setFile(event.target.files[0]);
            }}></Input>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Separator</InputLabel>
          <Select
            value={selectedSeparator}
            onChange={(event: ChangeEvent<{value: any}>) => {
              setSeparator(event.target.value);
            }}>
            <MenuItem value="semicolon">Semicolon ;</MenuItem>
            <MenuItem value="colon">Colon :</MenuItem>
            <MenuItem value="tab">Tab \t</MenuItem>
            <MenuItem value="comma">Comma ,</MenuItem>
            <MenuItem value="space">Space</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <Button
            disabled={file === null}
            variant="contained"
            color="primary"
            onClick={() => {
              handleFileUpload(file);
            }}
            endIcon={<ChevronRightIcon></ChevronRightIcon>}>
            Next
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UploadComponent;

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
    },
  }),
);
