import React from "react";
import Countdown from 'react-countdown';

const Timer = () => {
  return <Countdown date={Date.now() + 100000} />
};

export default Timer;