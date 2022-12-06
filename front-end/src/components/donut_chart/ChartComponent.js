import React, { useEffect, useRef } from "react";
import drawChart from "./drawCHart";

const DonutChart = ({data}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            let newData = alter_data(data);
            drawChart(ref.current, newData);
        }
    }, [ref]);

    return (
        <div className="container">
            <div className="graph" ref={ref} />
        </div>
    );
};

function alter_data(data) {
    // populate setChartData using transactions obj
    // includes labels
    // data = [ 
    //    { sin: 'limbo', value: 10 }, 
    //    { sin: 'lust', value: 2 },
    // ]
    let res = [];
    for (const [key, val] of Object.entries(data)) {
        if (typeof (val) === 'object' && val.percent != 0)
            res.push({sin: key, value: val.percent});
    }
    return res;
}

export default React.memo(DonutChart);