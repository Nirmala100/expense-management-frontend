import React from "react";
import { Chart } from "react-google-charts";

export default function PieChart(props) {
 
    console.log("PieChart section", props);

    const dataByCategory = props.expenses.reduce(function (map, obj) {
        if (obj["categoryName"] in map) {
            map[obj["categoryName"]] += obj["price"];

        } else {
            //initially create a obj with price
            map[obj["categoryName"]] = obj["price"];
        }

        return map;
    }, {});
    const dd = Object.keys(dataByCategory).map(key => [key, dataByCategory[key]]);
    dd.unshift(["Task", "Hours per Day"]);
    console.log("DataByCtegory", dd);

    return (
        <div className="App">

            <Chart
                chartType="PieChart"
                data={dd}
                options={{
                    title: "My Montly Expenses",
                    is3D: true,
                }}
                width={"100%"}
                height={"400px"}
            />


        </div>
    );
}