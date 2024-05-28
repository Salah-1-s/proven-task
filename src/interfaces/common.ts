export interface AppDateInterface {
  _id: string;
  name: string;
  boxes: {
    points: number[];
    text: string;
    class: string;
  }[];
  base64: string;
}

export interface GroupedBoxByClassInterface {
  class: string;
  index: number;
  points: number[];
  text: string;
}

export interface GroupedBoxesByClassInterface {
  [key: string]: GroupedBoxByClassInterface[];
}
