import styled from "styled-components";
import { motion } from "motion/react";

function LoadingCircleSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </SpinnerWrapper>
  );
}

const SpinnerWrapper = styled.div`
  position: absolute;
  inset: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #57C785;
`;

export default LoadingCircleSpinner;
