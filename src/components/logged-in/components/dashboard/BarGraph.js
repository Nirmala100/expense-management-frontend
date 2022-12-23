import React from "react";
import { Chart } from "react-google-charts";


export default function BarGraph(props) {
   
    const dataByMonth = props.expensesByMonth.reduce(function (map, obj) {
        const dateObj = new Date(obj["date"]*1000);
        const month = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
        // dateObj.getMonth();
        
        if (month in map) {
            map[month] += obj["price"];
        } else {
            //initially create 
            map[month] = obj["price"];
        }
        return map;
    }, {}); // initial value of map is {}
    
    console.log("Month", dataByMonth);
    const dd = Object.keys(dataByMonth).map(key => [key, dataByMonth[key]]);
    dd.unshift(["Month", "Expenses"]);
    console.log("DD", dd);


    return (
        <div className="App">

            { <Chart
                        chartType="Bar"
                        data={dd}
                        options={{
                            title: "My Montly Expenses",
                           
                          }}
                        width={"100%"}
                        height={"400px"}
                    /> }


        </div>
    );
}