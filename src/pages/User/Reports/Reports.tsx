import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Stack,
  TextField,
  // Toolbar,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  // DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Component, ReactNode } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "../../../services/axios.instance";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
} from "recharts";
// import { primaryColor, primaryLight } from "../../../assets/Theme";
import { primaryLight } from "../../../theme/Theme";
import { avg } from "../../../utils/utility";
// import { bills } from "../../../test/testdata";

const data = [
  { month: "Sept", uv: 400, pv: 2400, amt: 2400 },
  { month: "Oct", uv: 450, pv: 2400, amt: 2400 },
  { month: "Nov", uv: 450, pv: 2400, amt: 2400 },
  { month: "Dec", uv: 600, pv: 2400, amt: 2400 },
  { month: "Jan", uv: 330, pv: 2400, amt: 2400 },
];

const Reports = () => {
  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <Grid container spacing={5}>
          <Grid item>
            <Card>
              <Chart1 />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

class Chart1 extends Component {
  state = {
    fromDate: null,
    toDate: null,
    data: [],
    filteredData : [],
    selectedPlatform : null,
  };

  async componentDidMount() {
    const params = {
      filter: JSON.stringify({}),
      limit: "",
      pagenumber: "",
      sort: JSON.stringify({}),
    };
    const response = await axios.get(`series/filtered`, { params });

    this.setState({ data: response.data.data.data, filteredData : response.data.data.data});
  }

  histogramData = (_data : any) => {
    interface LooseObject {
        [key: string]: any
    }
    
    let data: LooseObject = {};

    for(const s of _data){
        if (s.genre in data){
            data[s.genre].push(s.rating)
        }
        else{
            data[s.genre] = [s.rating]
        }
    }

    let dataPoints = Object.keys(data).map((g) => {
        return {
            genre : g,
            ratingAvg : avg(data[g])
        }
    })

    return dataPoints;
  }

  getPlatforms = (_data : any) => {
    return ([... new Set(_data.map((s : any) => {return s.streamingOn}))])
  }

  filterByPlatform = (_data : any,p : any) => {
    return p !== null ? _data.filter((d : any) => {return d.streamingOn === p}) : _data
  }

  render(): ReactNode {
    return (
      <Stack sx={{ padding: 2 }} spacing={2} alignItems="center">
        <Typography>Average Rating By Genre</Typography>

        <BarChart
          width={800}
          height={400}
          data={this.histogramData(this.filterByPlatform(this.state.data, this.state.selectedPlatform))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="genre"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="ratingAvg" fill={primaryLight} background={{ fill: "#eee" }} />
        </BarChart>

        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {this.getPlatforms(this.state.data).map((p)=>{ return <Button onClick={()=>{this.setState({selectedPlatform : p})}}>{p as string}</Button>})}
      </ButtonGroup>
    </Box>
      </Stack>
    );
  }
}

export default Reports;
