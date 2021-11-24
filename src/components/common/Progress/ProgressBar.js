import React from 'react';

export default function ProgressBar({ color, percent, ...rest }) {
  return (
    <div className='bar'>
      <div
        className='bar-percent'
        style={{ width: percent ? percent : '25%' }}
      />
      <style jsx>{`
        .bar {
          width: 100%;
          height: 0.5rem;
          background-color: #e8e8e8;
        }
        .bar-percent {
          height: 100%;
          background-color: ${color ? color : 'red'};
          border-radius: inherit;
        }
      `}</style>
    </div>
  );
}
