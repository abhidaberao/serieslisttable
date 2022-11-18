import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from "@mui/material";
import { Component, ReactNode } from "react";

export default class FilterForm extends Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        year: 2012,
        rating: 2,
        platform: -1,
        genre: -1,
      };
    }

    buildOptions = (itemList : any) => {
      

      let options = itemList.map((p: any, i: any) => {
        return <MenuItem value={i}>{p}</MenuItem>;
      });

      options.push(<MenuItem value={-1}>Any</MenuItem>);

      return options;

    }
  
    render(): ReactNode {
      return (
        <Box sx={{ padding: 4 }}>
          <Stack spacing={2} alignItems="center">
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={this.state.genre}
                label="Genre"
                onChange={(event: SelectChangeEvent) => {
                  this.setState({ genre: event.target.value as string });
                }}
              >
                {this.buildOptions(this.props.filterRange.genres)}
              </Select>
            </FormControl>
  
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={this.state.platform}
                label="Platform"
                onChange={(event: SelectChangeEvent) => {
                  this.setState({ platform: event.target.value as string });
                }}
              >
                {this.buildOptions(this.props.filterRange.platforms)}
              </Select>
            </FormControl>
  
            <Typography>Rating</Typography>
            <Slider
              sx={{ width: 300 }}
              getAriaLabel={() => "Rating"}
              value={this.state.rating}
              onChange={(event: Event, newValue: number | number[]) => {
                this.setState({ rating: newValue });
              }}
              valueLabelDisplay="on"
              step={1}
              marks
              min={0}
              max={10}
            />
  
            <Typography>Years</Typography>
            <Slider
              sx={{ width: 300 }}
              getAriaLabel={() => "Year Range"}
              value={this.state.year}
              onChange={(event: Event, newValue: number | number[]) => {
                this.setState({ year: newValue });
              }}
              valueLabelDisplay="on"
              step={1}
              marks
              min={2000}
              max={2022}
            />
  
            <Button
              variant="contained"
              onClick={() => {
                this.props.setFilterCallback({
                  genre: this.props.filterRange.genres[this.state.genre],
                  streamingOn:
                    this.props.filterRange.platforms[this.state.platform],
                  rating: this.state.rating as string,
                  yearOfRelease: this.state.year as string,
                });
              }}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      );
    }
  }