import React from "react"
import {Slider} from "antd";

interface SliderProps{
  background: string;
  sliderHeading: string;
  sliderExplanation: string;
  values: number[];
}
export default function SliderComponent(props: SliderProps){
  const marks: SliderMarks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };

  return(
    <div>
      test
    </div>

  )
}
