import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  table: {
  },
});

export default function DenseTable(props) {
  const classes = useStyles();

  
  const headers = props.headers;
  const rows = props.data;
  
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
              {
                  headers.map((val, i) => {
                      return (
                        <TableCell key={val}>
                            <Box fontWeight={900} align={i === 0 ? "left" : "right"} >
                                {val}
                            </Box>
                        </TableCell>
                      );
                  })
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <TableRow key={row[0]}>
                {
                  row.map((data, i) =>  (
                      <TableCell key={data} align={i === 0 ? "left" : "right"} component={i === 0 ? "th" : "td"} scope={i === 0 ? "row" : null}>
                        {data}
                      </TableCell>
                    )
                  )
                }
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DenseTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired
};
  