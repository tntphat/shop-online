import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import {
  ArgumentScale,
  Stack,
  Animation,
  EventTracker,
  ValueScale,
} from "@devexpress/dx-react-chart";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  titleText: {
    textAlign: "left",
  },
};

const stacks = [{ series: ["👶 Young", "🧑 Adult", "🧓 Old"] }];

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.titleText} />
));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          state: "Germany",
          young: 6.7,
          middle: 28.6,
          older: 5.1,
        },
        {
          state: "Japan",
          young: 9.6,
          middle: 43.4,
          older: 9,
        },
        {
          state: "Russia",
          young: 13.5,
          middle: 49,
          older: 5.8,
        },
        {
          state: "USA",
          young: 30,
          middle: 90.3,
          older: 14.5,
        },
      ],
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentScale />
          <ValueScale />
          <ArgumentAxis
            showTicks={false}
            position="bottom"
            showLine={false}
            // showLabels={false}
          />
          <ValueAxis />

          <BarSeries valueField="young" argumentField="state" name="Young" />
          <BarSeries valueField="middle" argumentField="state" name="Middle" />
          <BarSeries
            valueField="older"
            argumentField="state"
            name="Older"
            color="#333333"
            barWidth={0.5}
          />
          <Stack
            stacks={stacks}
            // stacks={[{ series: ["Middle", "Young", "Older"] }]}
          />
          <Title text="👪 Population" textComponent={TextComponent} />
          <Legend />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    );
  }
}
