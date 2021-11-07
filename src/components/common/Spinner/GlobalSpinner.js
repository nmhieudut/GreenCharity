import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { color } from "src/constants/color";

export default function GlobalSpinner() {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      bg={bg}
      className="w-full h-full fixed block top-0 left-0 opacity-75 z-50"
    >
      <Box className="w-full h-full flex flex-col justify-center items-center">
        <div className="spinner-wrapper">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Text fontSize="lg" mt={8}>
          Đang tải dữ liệu, vui lòng chờ...
        </Text>
      </Box>
      <style jsx>{`
        .spinner-wrapper {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
          width: 2em;
        }

        span {
          width: 0.3em;
          height: 1em;
          background-color: ${color.PRIMARY};
        }

        span:nth-of-type(1) {
          animation: grow 1s -0.45s ease-in-out infinite;
        }

        span:nth-of-type(2) {
          animation: grow 1s -0.3s ease-in-out infinite;
        }

        span:nth-of-type(3) {
          animation: grow 1s -0.15s ease-in-out infinite;
        }

        span:nth-of-type(4) {
          animation: grow 1s ease-in-out infinite;
        }

        @keyframes grow {
          0%,
          100% {
            transform: scaleY(1);
          }

          50% {
            transform: scaleY(2);
          }
        }
      `}</style>
    </Box>
  );
}
