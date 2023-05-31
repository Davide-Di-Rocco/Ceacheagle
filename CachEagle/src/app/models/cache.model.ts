import {Photo} from "@capacitor/camera";
import {Hint} from "./hint.model";
import {Review} from "./review.modal";

export class Cache {
  title!: string;
  description!: string;
  difficulty!: number;
  hints!: Hint[]
  photo!: string;
  creatorId!: number;
  latitude!: number;
  longitude!: number;
  reviews!: Review[];
}
