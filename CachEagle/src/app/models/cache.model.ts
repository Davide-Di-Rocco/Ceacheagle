import {Photo} from "@capacitor/camera";
import {Hint} from "./hint.model";

export class Cache {
  title!: string;
  description!: string;
  hints!: Hint[]
  photo!: Photo;
}
