export interface doctorsData {
  avatar: string;
  id: string;
  name: string;
  star: number;
  information: informationScheme[]
}

export interface informationScheme {
  text: string;
  id: string;
  title: string;
}

export class DoctorsModel {
  data: doctorsData[];
  code: number;
  message: string;
}
