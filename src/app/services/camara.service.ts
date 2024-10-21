import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    return image.webPath; // Asegúrate de que esto devuelva la URL de la imagen
  }
}
