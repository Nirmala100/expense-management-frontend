import React from "react";
import { Chart } from "react-google-charts";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      return (
        <Chart
          chartType="PieChart"
          data={this.props.data}
          options={{
            pieHole: 0.6,
            is3D: false,
            backgroundColor: "transparent",
            legend: "none",
            pieSliceText: "none",
            pieStartAngle: 180,
          }}
          width={"100%"}
          height={"400px"}
        />
      );
    } else {
      return (
        <div>
          No data available.
        </div>
      );
    }

  }
}