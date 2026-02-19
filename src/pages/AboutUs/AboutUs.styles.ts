import styled from "styled-components";
import image from "@assets/AboutUs/image6.jpg";

export const Hero = styled.div`
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${image});
  position: relative;

  z-index: 50;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: black;
    z-index: 1;
    opacity: 0.5;
  }

  h3 {
    font-size: 23px;
    font-weight: bold;
  }

  p {
    font-size: 16px;
  }
`;
