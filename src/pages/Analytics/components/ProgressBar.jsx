import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ percentage }) => {

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={percentage}
        text={`${Number(percentage?.toFixed(2))}%`}
        styles={buildStyles({
          pathColor: "#00FF00", // bright green
          textColor: "#000000", // black
          trailColor: "#f0f4ff", // light background circle
          strokeLinecap: "round",
        })}
      />
    </div>
  );
};

export default ProgressBar;