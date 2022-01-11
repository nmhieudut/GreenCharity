import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaTiktok
} from 'react-icons/fa';
import { color } from 'src/constants/color';
import Button from '../../Button';

export default function MemberCard({ data }) {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const { picture, name, as, github, instagram, facebook, tiktok } = data;
  return (
    <>
      <Box
        bg={bg}
        shadow='lg'
        maxW={300}
        w='full'
        h={400}
        rounded='lg'
        textAlign='center'
        overflow='hidden'
        my={8}
      >
        <div className='card__img'>
          <img src={picture} alt={name} />
        </div>
        <Heading
          mt={10}
          as='h3'
          size='md'
          fontWeight='bold'
          color={`#${randomColor}`}
        >
          {name}
        </Heading>
        <Text mt={4} textTransform='uppercase'>
          {as}
        </Text>
        <Grid p={4} templateColumns='repeat(4, 1fr)' gap={4} my={4}>
          <a
            className='flex justify-center align-center'
            target='_black'
            href='https://www.facebook.com/nam.nodemy'
          >
            <FaFacebookSquare />
          </a>
          <a
            className='flex justify-center align-center'
            target='_black'
            href='https://www.youtube.com/c/Nodemy'
          >
            <FaInstagram />
          </a>
          <a
            className='flex justify-center align-center'
            target='_black'
            href='https://www.tiktok.com/@manindev'
          >
            <FaTiktok />
          </a>
          <a
            className='flex justify-center align-center'
            target='_black'
            href='https://github.com/namndwebdev/html-css-js-thuc-chien'
          >
            <FaGithub />
          </a>
        </Grid>
        <Button noLinear colorScheme='purple' variant='outline'>
          Liên hệ
        </Button>
      </Box>
      <style jsx>{`
        .card {
          width: 300px;
          height: 400px;
          border-radius: 10px;
          text-align: center;
          overflow: hidden;
          margin: 0 30px;
        }

        .card__img {
          display: inline-block;
          padding: 8px;
          background: linear-gradient(
            -45deg,
            #fc6c8f,
            #ff2ced,
            #ffb86c,
            #2cccff,
            #20e3b2,
            #ffcc70,
            #c850c0,
            #4158d0
          );
          margin: auto;
          border-radius: 50%;
          background-size: 200% 200%;
          animation: animated-gradient 2s linear infinite;
          width: 120px;
          height: 120px;
          overflow: hidden;
          transition: 0.25s;
          margin: 0 auto;
          transform: translateY(25px);
          border-radius: 50%;
          cursor: pointer;
        }

        .card__img:hover {
          width: 100%;
          height: 100%;
          border-radius: unset;
          border: unset;
          transform: unset;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
        }
        .card__img:hover > img {
          border-radius: unset;
        }

        a:hover {
          color: ${color.PRIMARY};
        }

        @keyframes animated-gradient {
          25% {
            background-position: left bottom;
          }
          50% {
            background-position: right bottom;
          }
          75% {
            background-position: right top;
          }
          100% {
            background-position: left top;
          }
        }
      `}</style>
    </>
  );
}
