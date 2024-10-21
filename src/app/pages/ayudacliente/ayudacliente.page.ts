import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasSilenciosasService } from 'src/app/services/alertasilenciosa.service'; // Asegúrate de que la ruta sea correcta

interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ayudacliente',
  templateUrl: './ayudacliente.page.html',
  styleUrls: ['./ayudacliente.page.scss'],
})
export class AyudaclientePage implements OnInit {
  categorias: Categoria[] = [
    { value: 'consolas', viewValue: 'Consolas' },
    { value: 'juegos', viewValue: 'Juegos' },
    { value: 'juguetes', viewValue: 'Juguetes' },
    { value: 'perfil', viewValue: 'Perfil' },
    { value: 'compra', viewValue: 'Compra' },
  ];

  // Datos del formulario
  categoria: string = '';
  email: string = '';
  descripcion: string = '';

  constructor(
    private router: Router,
    private alertasSilenciosasService: AlertasSilenciosasService // Inyecta el servicio
  ) {}

  ngOnInit() {}

  async onSubmit() {
    // Validación de campos
    if (!this.categoria || !this.email.includes('@') || !this.descripcion) {
      await this.alertasSilenciosasService.presentSilentToast('Por favor completa todos los campos correctamente.', 2000);
      return;
    }

    // Mostrar el toast de éxito
    await this.alertasSilenciosasService.presentSilentToast('Petición enviada', 2000);

    // Redirigir a la página de perfil después del toast
    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 0);
  }
}
