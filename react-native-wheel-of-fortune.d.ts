declare module 'react-native-wheel-of-fortune' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface WheelOfFortuneProps {
    rewards: string[];
    getWinner: (value: string) => void;
    backgroundColor?: string;
    knobSize?: number;
    borderWidth?: number;
    borderColor?: string;
    innerRadius?: number;
    duration?: number;
    textAngle?: number;
    textColor?: string;
    knobSource?: any;
    onRef?: (ref: any) => void;
    style?: ViewStyle;
  }

  export default class WheelOfFortune extends Component<WheelOfFortuneProps> {}
}