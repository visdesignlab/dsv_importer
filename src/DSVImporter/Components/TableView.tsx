import React, {FC, ChangeEvent, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Data from '../Interfaces/Data';
import {
  ReverseColumnTypeMap,
  ColumnTypeMap,
  ColumnTypeKeys,
  ColumnMap,
} from '../Interfaces/ColumnType';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

interface Props {
  data: Data;
  handleColumnTypeChange: (colMap: ColumnMap) => void;
}

const TableView: FC<Props> = ({data, handleColumnTypeChange}: Props) => {
  const SEP = Math.random().toFixed(5);

  const {rows, columns, columnTypeMap} = data;

  const [colTypeMap, setColTypeMap] = useState<ColumnMap>(columnTypeMap);

  const size = rows.length;
  let filteredRows: any[] = rows.map((r: any, idx: number) => ({idx, ...r}));
  if (size > 60)
    filteredRows = [
      ...filteredRows.slice(0, 30),
      ...[{[SEP]: SEP}],
      ...filteredRows.slice(size - 30, size),
    ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {['', ...columns].map(col => (
                <TableCell key={col} align="center">
                  {col}
                  {col.length > 0 && (
                    <Select
                      value={ReverseColumnTypeMap[colTypeMap[col]]}
                      onChange={(event: ChangeEvent<{value: any}>) => {
                        setColTypeMap({
                          ...colTypeMap,
                          [col]:
                            ColumnTypeMap[event.target.value as ColumnTypeKeys],
                        });
                      }}>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="label">Label</MenuItem>
                      <MenuItem value="set">Set</MenuItem>
                      <MenuItem value="set-list">Set List</MenuItem>
                      <MenuItem value="categorical">Categorical</MenuItem>
                    </Select>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row: any, idx: number) => {
              return row[SEP] && row[SEP] === SEP ? (
                <TableRow key={idx}>
                  <TableCell colSpan={columns.length - 1}>...</TableCell>
                </TableRow>
              ) : (
                <TableRow key={idx}>
                  {['idx', ...columns].map(col => (
                    <TableCell key={col} align="center">
                      {row[col]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        style={{padding: '0.75em'}}
        container
        justify="center"
        alignItems="center">
        <Grid container item xs justify="center" alignItems="center"></Grid>
        <Grid container item xs justify="center" alignItems="center" />
        <Grid container item xs justify="center" alignItems="center">
          <Button
            endIcon={<ChevronRightIcon></ChevronRightIcon>}
            variant="contained"
            color="primary"
            onClick={() => {
              handleColumnTypeChange(colTypeMap);
            }}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TableView;
