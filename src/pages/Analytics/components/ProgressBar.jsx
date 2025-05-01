import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ percentage }) => {

  return (
    <div style={{ width: 70, height: 100, display: 'flex', alignItems: 'center' }}>
      <CircularProgressbar
        value={percentage}
        text={`${Number(percentage?.toFixed(2))}%`}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: "#00D907", // bright green
          textColor: "#000000", // black
          trailColor: "#f0f4ff", // light background circle
          strokeLinecap: "round",
          
        })}
      />
    </div>
  );
};

export default ProgressBar;