import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service'; // Ruta del servicio
import { CamaraService } from 'src/app/services/camara.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-agregarconsola',
  templateUrl: './agregarconsola.page.html',
  styleUrls: ['./agregarconsola.page.scss'],
})
export class AgregarconsolaPage implements OnInit {

  nombre: string = '';
  descripcion: string = '';
  precio!: number;
  stock!: number;
  urlImagen: string = '';

  errorCampos: boolean = false;
  errorPrecio: boolean = false;
  errorStock: boolean = false;
  errorImagen: boolean = false;

  constructor(
    private router: Router,
    private bd: ManejodbService,
    private camaraService: CamaraService // Inyecta el servicio
  ) {}

  ngOnInit() {}

  async validarCampos() {
    this.resetErrores();

    if (!this.nombre || !this.descripcion || this.precio === null || this.stock === null || !this.urlImagen) {
      this.errorCampos = true;
      return;
    }

    if (this.precio < 0) {
      this.errorPrecio = true;
      return;
    }

    if (this.stock < 0) {
      this.errorStock = true;
      return;
    }

    // Intentar agregar la consola
    try {
      await this.bd.agregarConsola(this.nombre, this.precio, this.stock, this.descripcion, this.urlImagen);
      this.router.navigate(['/crudconsolas']);
    } catch (error) {
      console.error('Error al agregar la consola:', error);
      // Manejo de errores, como mostrar una alerta
    }
  }

  private resetErrores() {
    this.errorCampos = false;
    this.errorPrecio = false;
    this.errorStock = false;
    this.errorImagen = false;
  }

  // Método para capturar la imagen usando el servicio de cámara
  async tomarFoto() {
    try {
      const fotoUrl = await this.camaraService.takePicture();
      if (fotoUrl) {
        this.urlImagen = fotoUrl; // Asigna la URL de la imagen
        this.errorImagen = false; // Limpia el error si se toma la foto
      } else {
        this.errorImagen = true; // Manejo si no se devuelve una imagen
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.errorImagen = true; // Mostrar mensaje de error si algo falla
    }
  }

  // Método para validar que los valores de precio y stock sean enteros
  validarNumeroEntero(campo: string) {
    if (campo === 'precio') {
      this.precio = Math.floor(this.precio || 0); // Redondea hacia abajo si es decimal
    } else if (campo === 'stock') {
      this.stock = Math.floor(this.stock || 0); // Redondea hacia abajo si es decimal
    }
  }
}
