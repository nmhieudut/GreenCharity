import React from "react";

export default function Progress({ color, percent, ...rest }) {
  return (
    <div className="bar">
      <div
        className="bar-percent"
        style={{ width: percent ? percent : "25%" }}
      />
      <style jsx>{`
        .bar {
          width: 100%;
          height: 0.5rem;
          border-radius: 5rem;
          border: 1px solid #eee;
        }
        .bar-percent {
          height: 100%;
          background-color: ${color ? color : "red"};
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}
