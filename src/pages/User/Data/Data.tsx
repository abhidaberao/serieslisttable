import { SearchTwoTone, TuneTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Component, ReactNode } from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTabel";
import axios from "../../../services/axios.instance";
import FilterForm from "./FilterForm";

class Data extends Component {
  state = {
    isFilterModalOpen: false,
    limit: 5,
    pageNumber: 0,
    rowData: [],
    filterRange: {
      genres: [],
      platforms: [],
      ratings: [],
      years: [],
    },
    filters: {
      genre: "",
      streamingOn: "",
      rating: "",
      yearOfRelease: "",
    },
    isNext: false,
    isPrev: false,
    totalCount: 0,
    sortBy: {},
    searchQuery : '',
  };

  closeFilterModal = () => {
    this.setState({ isFilterModalOpen: false });
  };

  openFilterModal = () => {
    this.setState({ isFilterModalOpen: true });
  };

  setPageNumberCallback = (_pageNumber: number) => {
    this.setState({ pageNumber: _pageNumber });
  };

  setLimitCallback = (_limit: number) => {
    this.setState({ limit: _limit });
  };

  setFilterCallback = (_filters: any) => {
    this.setState({ filters: _filters, pageNumber: 0 });
    this.closeFilterModal();
  };

  setSortBy = (sort: any) => {
    this.setState({ sortBy: sort });
  };

  async getfilterRange() {
    const genreQuery = await axios.get(`series?field=genre`);
    const ratingQuery = await axios.get(`series?field=rating`);
    const yearQuery = await axios.get(`series?field=yearOfRelease`);
    const platformsQuery = await axios.get(`series?field=streamingOn`);

    return {
      genres: genreQuery.data.data,
      platforms: platformsQuery.data.data,
      ratings: ratingQuery.data.data,
      years: yearQuery.data.data,
    };
  }

  async getAndSetData() {
    if(this.state.searchQuery === ''){
      const params = {
        filter: JSON.stringify({
          ...(this.state.filters.streamingOn !== "" && {
            streamingOn: this.state.filters.streamingOn,
          }),
          ...(this.state.filters.genre !== "" && {
            genre: this.state.filters.genre,
          }),
        }),
        limit: this.state.limit,
        pagenumber: this.state.pageNumber + 1,
        sort: JSON.stringify(this.state.sortBy),
      };
      const response = await axios.get(`series/filtered`, { params });
  
      const _filterRange = await this.getfilterRange();
  
      this.setState({
        rowData: response.data.data.data,
        filterRange: _filterRange,
        isNext: response.data.data.next == "true" ? true : false,
        isPrev: response.data.data.prev == "true" ? true : false,
        totalCount: response.data.data.total,
      });
    }

    else {

      // console.log("searhcing")

      // const params = {
      //   search :  this.state.searchQuery,
      //   limit : this.state.limit,
      //   pagenumber : this.state.pageNumber + 1
      // }
      // const response = await axios.get(`series/search`, { params });

      // this.setState({
      //   rowData: response.data.data.data,
      //   isNext: response.data.data.next == "true" ? true : false,
      //   isPrev: response.data.data.prev == "true" ? true : false,
      //   totalCount: response.data.data.total,
      // });
    }


  }

  handleSearch = (query : string) => {
    this.setState({ searchQuery: query })
  }

  async componentDidMount() {
    this.getAndSetData();
  }

  async componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    if (
      prevState.limit !== this.state.limit ||
      prevState.pageNumber !== this.state.pageNumber ||
      prevState.filters !== this.state.filters ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.getAndSetData();
    }
  }

  render(): ReactNode {
    return (
      <div>
        <Box overflow="hidden">
          <CustomModal
            open={this.state.isFilterModalOpen}
            closeCallback={this.closeFilterModal}
            title={"Filter"}
            content={
              <FilterForm
                filterRange={this.state.filterRange}
                setFilterCallback={this.setFilterCallback}
              />
            }
          />
          <Stack direction="row" spacing={4} padding={5}>
            <TextField
              fullWidth
              size="medium"
              id="outlined-basic"
              variant="outlined"
              placeholder="Search ....."
              onChange={(e) => this.handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoTone />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" onClick={this.openFilterModal}>
              <TuneTwoTone />
            </Button>
          </Stack>

          <Box pl={5} pr={5} pb={5}>
            <PaginatedTable
              limit={this.state.limit}
              pageNumber={this.state.pageNumber}
              rowData={this.state.rowData}
              setLimitCallback={this.setLimitCallback}
              setPageNumberCallback={this.setPageNumberCallback}
              setSortBy={this.setSortBy}
              isNext={this.state.isNext}
              isPrev={this.state.isPrev}
              totalCount={this.state.totalCount}
            />
          </Box>
        </Box>
      </div>
    );
  }
}



export default Data;
