import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { feeder } from "../../test";
import { Box, IconButton, Stack, TablePagination } from "@mui/material";
import {
  ArrowDownwardTwoTone,
  ArrowDropDownTwoTone,
  ArrowDropUpTwoTone,
  ArrowUpwardTwoTone,
  ImportExportTwoTone,
} from "@mui/icons-material";

/*
localhost:4000/series/filtered?filter={}&limit=1&pagenumber=1&sort={}
*/

const labels = [
  {
    key : 'name',
    label : 'Name',
    asc : 'nameAsc'
  },
  {
    key : 'genre',
    label : 'Genre',
    asc : 'genreAsc'
  },
  {
    key : 'rating',
    label : 'Rating',
    asc : 'ratingAsc'
  },
  {
    key : 'yearOfRelease',
    label : 'Release Year',
    asc : 'yearAsc'
  },
  {
    key : 'streamingOn',
    label : 'Streaming On',
    asc : 'streamingAsc'
  }
] 

const getSortQuery = (key : string, isAscending : boolean) => {

  const d = isAscending? 1 : -1

    switch(key){
      case 'name':
        return {name : d}
        break;
      case 'genre':
        return {genre : d}
        break;
      case 'rating':
        return {rating : d}
        break;
      case 'yearOfRelease':
        return {yearOfRelease : d}
        break;
      case 'streamingOn':
        return {streamingOn : d}
        break;
    }
}

class PaginatedTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sortActive: "rating",
      isAscending : true
    };
  }

  render(): React.ReactNode {
    const rows = this.props.rowData;

    return (
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {labels.map((l) => {
                  return (
                  <TableCell align="center">
                    <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>{l.label}</Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        this.setState({ isAscending : !this.state.isAscending, sortActive : l.key});
                        this.props.setSortBy(
                          getSortQuery(l.key, this.state.isAscending)
                        );
                      }}
                    >
                      {this.state.isAscending && this.state.sortActive === l.key? (
                        <ArrowDropDownTwoTone/>
                      ) : (
                        <ArrowDropUpTwoTone />
                      )}
                    </IconButton>
                  </Stack>
                  </TableCell>)
                })}
                
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {rows.map((row: any, i: number) => (
                  <TableRow
                    key={`${i}${row.name}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.genre}</TableCell>
                    <TableCell align="center">{row.rating}</TableCell>
                    <TableCell align="center">{row.yearOfRelease}</TableCell>
                    <TableCell align="center">{row.streamingOn}</TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          count={this.props.totalCount}
          rowsPerPage={this.props.limit}
          page={this.props.pageNumber}
          onPageChange={(event: unknown, newPage: number) => {
            this.props.setPageNumberCallback(newPage);
          }}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.props.setLimitCallback(event.target.value);
          }}
          nextIconButtonProps={{ disabled: !this.props.isNext }}
          backIconButtonProps={{ disabled: !this.props.isPrev }}
        />
      </Paper>
    );
  }
}

export default PaginatedTable;
