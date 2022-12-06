import React, { useEffect, useRef } from "react";
import drawChart from "./drawCHart";

const DonutChart = ({data}) => {
    const ref = useRef(null);

    useEffect(() => {
        (async () => {
            if (ref.current) {
                await drawChart(ref.current, data);
            }
          })();
    }, [ref]);

    return (
        <div className="container">
            <div className="graph" ref={ref} />
        </div>
    );
};

export default React.memo(DonutChart);