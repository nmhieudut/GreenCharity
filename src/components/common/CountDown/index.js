import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 80,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <Flex flexDirection='column' align='center' justify='center'>
      <Text fontWeight={600}>{time}</Text>
      <Text>{dimension}</Text>
    </Flex>
  );
};

const getTimeSeconds = time => (minuteSeconds - time) | 0;
const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = time => (time / daySeconds) | 0;

export default function CountDown({ time }) {
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = new Date(time) / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <Box>
      {remainingTime <= 0 ? (
        <Flex justify='center' align='center'>
          <Text color='red' fontWeight={600}>
            Hết hạn
          </Text>
        </Flex>
      ) : (
        <Stack direction='row' spacing={6} w='full'>
          <CountdownCircleTimer
            {...timerProps}
            colors={[['#7E2E84']]}
            duration={daysDuration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime }) =>
              renderTime('Ngày', getTimeDays(daysDuration - elapsedTime))
            }
          </CountdownCircleTimer>
          <CountdownCircleTimer
            {...timerProps}
            colors={[['#D14081']]}
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={totalElapsedTime => [
              remainingTime - totalElapsedTime > hourSeconds
            ]}
          >
            {({ elapsedTime }) =>
              renderTime('Giờ', getTimeHours(daySeconds - elapsedTime))
            }
          </CountdownCircleTimer>
          <CountdownCircleTimer
            {...timerProps}
            colors={[['#EF798A']]}
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={totalElapsedTime => [
              remainingTime - totalElapsedTime > minuteSeconds
            ]}
          >
            {({ elapsedTime }) =>
              renderTime('Phút', getTimeMinutes(hourSeconds - elapsedTime))
            }
          </CountdownCircleTimer>
          <CountdownCircleTimer
            {...timerProps}
            colors={[['#218380']]}
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={totalElapsedTime => [
              remainingTime - totalElapsedTime > 0
            ]}
          >
            {({ elapsedTime }) =>
              renderTime('Giây', getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </Stack>
      )}
    </Box>
  );
}
