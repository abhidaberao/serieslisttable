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
import { ArrowDownwardTwoTone, ArrowDropDownTwoTone, ArrowDropUpTwoTone, ArrowUpwardTwoTone, ImportExportTwoTone } from "@mui/icons-material";




/*
localhost:4000/series/filtered?filter={}&limit=1&pagenumber=1&sort={}
*/


class PaginatedTable extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            sortActive : 'rating',
            ratingAsc : true,
            yearAsc : true
        }
    }

    render(): React.ReactNode {

        const rows = this.props.rowData

        return (

            <Paper>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Genre</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                        <Box>Rating</Box>
                                        <IconButton size="small" onClick={() => {
                                            this.setState({ratingAsc : !this.state.ratingAsc})
                                            this.props.setSortBy({rating : this.state.ratingAsc?1:-1})
                                            }}>
                                            {this.state.ratingAsc?<ArrowDropDownTwoTone/>:<ArrowDropUpTwoTone/>}
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                        <Box>Release Year</Box>
                                        <IconButton size="small" onClick={() => {
                                            this.setState({yearAsc : !this.state.yearAsc})
                                            this.props.setSortBy({yearOfRelease : this.state.yearAsc?1:-1})
                                            }}>
                                            {this.state.ratingAsc?<ArrowDropDownTwoTone/>:<ArrowDropUpTwoTone/>}
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">Streaming On</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <>
                                {rows.map((row: any, i: number) => (
                                    <TableRow
                                        key={`${i}${row.name}`}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.name}</TableCell>
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
                    onPageChange={(event: unknown, newPage: number) => { this.props.setPageNumberCallback(newPage) }}
                    onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => { this.props.setLimitCallback(event.target.value) }}

                    nextIconButtonProps={{ disabled: !this.props.isNext }}
                    backIconButtonProps={{ disabled: !this.props.isPrev }}
                />
            </Paper>

        );
    }
}

export default PaginatedTable;
