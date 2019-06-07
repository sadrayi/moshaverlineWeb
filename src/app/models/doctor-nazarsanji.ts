export interface nazarsanjiData {
  name: string;
  avatar: string;
  star: number;
  star_comment: string;
  date: string;

}

export class DoctorNazarsanji {
  code: number;
  message: string;
  data: nazarsanjiData[];
}
