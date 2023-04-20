import React from "react";
import { Chart } from "react-google-charts";

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      return (
        <Chart
          chartType="ColumnChart"
          data={this.props.data}
          options={{
            backgroundColor: "transparent",
            legend: "none",
            isStacked: true,
          }}
          width={"100%"}
          height={"400px"}
        />
      );
    } else {
      return (
        <div>No data for this period</div>
      );
    }
  }
}
