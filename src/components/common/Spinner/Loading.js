import { Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { color } from 'src/constants/color';

export default function Loading() {
  return (
    <Flex w='full' flexDir='column' justifyContent='center' alignItems='center'>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Text mt={4}>Loading...</Text>
      <style jsx>{`
        div {
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
    </Flex>
  );
}
