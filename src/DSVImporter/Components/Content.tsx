import React, {FC, useState, useContext} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableView from './TableView';
import UploadComponent from './UploadComponent';
import {StepType} from '../Interfaces/Step';
import Data from '../Interfaces/Data';
import {dsvFormat} from 'd3';
import {
  DatasetInfo,
  getDefaultDatasetInfo,
  SetInfo,
  MetaData,
} from '../Interfaces/DatasetInfo';
import {Separators, SeparatorMap, getSeparator} from '../Interfaces/Separator';
import {
  ColumnMap,
  getColumnType,
  ColumnTypeMap,
  isNumericArray,
  isDecimalArray,
} from '../Interfaces/ColumnType';
import {MyContext, DATA_SERVER_STRING} from '../DSVImporter';
import DetailsForm from './DetailsForm';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {green} from '@material-ui/core/colors';

interface Props {
  step: StepType;
}

const Content: FC<Props> = ({step}: Props) => {
  const classes = useStyles();
  const [data, setData] = useState<Data>({
    rows: [],
    columns: [],
    columnTypeMap: {},
  });
  const [uploadComplete, setUploadComplete] = useState(false);
  const [file, setFile] = useState<File>(null as any);
  const [rawData, setRawData] = useState<string>('');
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo>(
    getDefaultDatasetInfo(),
  );

  let component: any;

  const {goToNextStep} = useContext(MyContext);

  const setSeparator = (sep: Separators) => {
    setDatasetInfo({...datasetInfo, separator: SeparatorMap[sep]});
  };

  const handleFileUpload = (file: File) => {
    if (file && rawData === '' && step === StepType.UPLOAD) {
      const reader = new FileReader();
      reader.onload = function(event: any) {
        setRawData(event.target.result);
        setFile(file);
        goToNextStep();
      };
      reader.readAsText(file);
    }
  };

  if (rawData !== '' && (data.rows.length === 0 || data.columns.length === 0)) {
    setData(readDataset(rawData, datasetInfo.separator));
  }

  const handleColumnTypeChange = (columnMap: ColumnMap) => {
    const dinfo = getSetInfo(datasetInfo, data, columnMap);
    setDatasetInfo({...dinfo});
    goToNextStep();
  };

  const handleFormSubmission = (info: DatasetInfo) => {
    const formData = new FormData();

    formData.append('data', file);
    formData.append('metadata', JSON.stringify(info));

    axios
      .post(`${DATA_SERVER_STRING}upload`, formData)
      .then(res => {
        setUploadComplete(true);
        goToNextStep();
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (step === StepType.UPLOAD)
    component = (
      <UploadComponent
        setSeparator={setSeparator}
        selectedSeparator={getSeparator(datasetInfo.separator)}
        handleFileUpload={handleFileUpload}
      />
    );
  else if (step === StepType.COLUMNS)
    component = (
      <TableView handleColumnTypeChange={handleColumnTypeChange} data={data} />
    );
  else
    component = (
      <DetailsForm
        datasetInfo={datasetInfo}
        uploadComplete={uploadComplete}
        handleFormSubmission={handleFormSubmission}></DetailsForm>
    );

  return (
    <Container className={classes.root}>
      {component}
      {
        <Snackbar open={uploadComplete}>
          <SnackbarContent
            style={{backgroundColor: green[600]}}
            message="File uploaded successfully!"
          />
        </Snackbar>
      }
    </Container>
  );
};

export default Content;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      overflow: 'auto',
      padding: 0,
      display: 'grid',
      gridTemplateRows: 'auto min-content',
    },
  }),
);

function getSetInfo(
  datasetInfo: DatasetInfo,
  data: Data,
  columnMap: ColumnMap,
): DatasetInfo {
  const setIndices = data.columns
    .map((col, idx) =>
      columnMap[col] === ColumnTypeMap['set'] ? idx : undefined,
    )
    .filter(x => x !== undefined) as number[];

  const attributeIndices = data.columns
    .map((col, idx) =>
      columnMap[col] !== ColumnTypeMap['set'] ? idx : undefined,
    )
    .filter(x => x !== undefined) as number[];

  let consecutiveSets = setIndices.reduce(
    (results: any, item: any, idx: any, arr: any) => {
      if (item !== undefined) {
        if (arr[idx - 1] === undefined || arr[idx - 1] + 1 !== item)
          results.push([]);
        results[results.length - 1].push(item);
      }
      return results;
    },
    [],
  );

  const sets: SetInfo[] = [];

  consecutiveSets.forEach((s: number[]) => {
    sets.push({
      format: 'binary',
      start: s[0],
      end: s[s.length - 1],
    });
  });

  const meta: MetaData[] = [];

  attributeIndices.forEach((attrId: number) => {
    let metadata: MetaData = {
      type: 'string',
      index: attrId,
      name: data.columns[attrId],
    };

    if (columnMap[metadata.name] === ColumnTypeMap['label']) {
      metadata.type = 'id';
      meta.push(metadata);
      return;
    }

    const values = data.rows.map(d => d[metadata.name]);
    if (isNumericArray(values)) {
      if (isDecimalArray(values.map(parseFloat))) {
        metadata.type = 'float';
        metadata.min = Math.min(...values.map(parseFloat));
        metadata.max = Math.max(...values.map(parseFloat));
      } else {
        metadata.type = 'integer';
        metadata.min = Math.min(...values.map(v => parseInt(v, 10)));
        metadata.max = Math.max(...values.map(v => parseInt(v, 10)));
      }
    }

    meta.push(metadata);
  });

  return JSON.parse(JSON.stringify({...datasetInfo, sets, meta}));
}

function readDataset(rawData: string, sep: string): Data {
  const dsv = dsvFormat(sep);

  const data = dsv.parse(rawData);

  const rows = [...data];
  const columns = data.columns;

  const columnTypeMap: ColumnMap = {};

  columns.forEach(col => {
    const arr = rows.map((r: any) => r[col]);
    columnTypeMap[col] = getColumnType(arr);
  });

  return {rows, columns, columnTypeMap};
}
