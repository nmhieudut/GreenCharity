import React from "react";

export default function ImgLoading({ color, ...rest }) {
  return (
    <div>
      <style jsx>{`
        div {
          border: 3px solid ${color ? color : "red"};
          border-top-color: #fff;
          border-radius: 50%;
          width: 3em;
          height: 3em;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
