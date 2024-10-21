import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertasSilenciosasService {
  constructor(private toastController: ToastController) {}

  async presentSilentToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      cssClass: 'silent-toast', // Clase CSS opcional para estilos
      translucent: true, // Translucido para que no bloquee el contenido
    });
    await toast.present();
  }

  async presentSilentToast2(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
      cssClass: 'silent-toast', // Clase CSS opcional para estilos
      translucent: true, // Translucido para que no bloquee el contenido
    });
    await toast.present();
  }
}
