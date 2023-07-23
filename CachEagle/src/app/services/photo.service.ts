import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() {
  }

  async takeNewPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 50,
      allowEditing: true,
    })
    console.log(capturedPhoto)
    return capturedPhoto
  }

}
