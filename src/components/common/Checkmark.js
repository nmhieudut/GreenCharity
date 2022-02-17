import React from 'react';

export default function Checkmark({ status }) {
  if (!status) return null;
  return (
    <>
      <div>
        {status === 'success' ? (
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 130.2 130.2'
          >
            <circle
              className='path circle'
              fill='none'
              stroke='#73AF55'
              strokeWidth={6}
              strokeMiterlimit={10}
              cx='65.1'
              cy='65.1'
              r='62.1'
            />
            <polyline
              className='path check'
              fill='none'
              stroke='#73AF55'
              strokeWidth={6}
              strokeLinecap='round'
              strokeMiterlimit={10}
              points='100.2,40.2 51.5,88.8 29.8,67.5 '
            />
          </svg>
        ) : (
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 130.2 130.2'
          >
            <circle
              className='path circle'
              fill='none'
              stroke='#D06079'
              strokeWidth={6}
              strokeMiterlimit={10}
              cx='65.1'
              cy='65.1'
              r='62.1'
            />
            <line
              className='path line'
              fill='none'
              stroke='#D06079'
              strokeWidth={6}
              strokeLinecap='round'
              strokeMiterlimit={10}
              x1='34.4'
              y1='37.9'
              x2='95.8'
              y2='92.3'
            />
            <line
              className='path line'
              fill='none'
              stroke='#D06079'
              strokeWidth={6}
              strokeLinecap='round'
              strokeMiterlimit={10}
              x1='95.8'
              y1={38}
              x2='34.4'
              y2='92.2'
            />
          </svg>
        )}
      </div>

      <style jsx>{`
        svg {
          width: 100px;
          display: block;
          margin: 40px auto 0;
        }

        .path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 0;
        }
        .path.circle {
          -webkit-animation: dash 0.9s ease-in-out;
          animation: dash 0.9s ease-in-out;
        }
        .path.line {
          stroke-dashoffset: 1000;
          -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
          animation: dash 0.9s 0.35s ease-in-out forwards;
        }
        .path.check {
          stroke-dashoffset: -100;
          -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
          animation: dash-check 0.9s 0.35s ease-in-out forwards;
        }

        p {
          text-align: center;
          margin: 20px 0 60px;
          font-size: 1.25em;
        }
        p.success {
          color: #73af55;
        }
        p.error {
          color: #d06079;
        }

        @-webkit-keyframes dash {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @-webkit-keyframes dash-check {
          0% {
            stroke-dashoffset: -100;
          }
          100% {
            stroke-dashoffset: 900;
          }
        }

        @keyframes dash-check {
          0% {
            stroke-dashoffset: -100;
          }
          100% {
            stroke-dashoffset: 900;
          }
        }
      `}</style>
    </>
  );
}
