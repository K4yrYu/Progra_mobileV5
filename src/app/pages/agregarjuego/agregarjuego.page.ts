import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { CamaraService } from 'src/app/services/camara.service'; // Importa el servicio
import { AlertasSilenciosasService } from 'src/app/services/alertasilenciosa.service';

@Component({
  selector: 'app-agregarjuego',
  templateUrl: './agregarjuego.page.html',
  styleUrls: ['./agregarjuego.page.scss'],
})
export class AgregarjuegoPage implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  precio!: number;
  stock!: number;
  urlImagen: string = '';

  errorCampos: boolean = false;
  errorPrecio: boolean = false;
  errorStock: boolean = false;
  errorImagen: boolean = false;
  NoDisponible: boolean = false;

  constructor(
    private router: Router,
    private bd: ManejodbService,
    private camaraService: CamaraService, // Inyecta el servicio
    private silentAlert: AlertasSilenciosasService
  ) {}

  ngOnInit() {}

  async validarCampos() {
    this.resetErrores();
    // Validar que todos los campos necesarios estén completos
    if (!this.nombre || !this.descripcion || this.precio === null || this.stock === null || !this.urlImagen) {
      this.errorCampos = true;
      return;
    }

    // Validar que el precio y el stock no sean negativos
    if (this.precio < 0) {
      this.errorPrecio = true;
      return;
    }

    if (this.stock < 0) {
      this.errorStock = true;
      return;
    }


    // Intentar agregar el juego
    try {
      await this.bd.agregarJuegos(this.nombre, this.precio, this.stock, this.descripcion, this.urlImagen);
      this.Stock0NoDisponible();
      this.router.navigate(['/crudjuegos']);
    } catch (error) {
      console.error('Error al agregar el juego:', error);
      // Aquí puedes mostrar una alerta o manejar el error de otra manera
    }
  }

  async Stock0NoDisponible () {
    if (this.stock === 0) {
      //stock es 0
      this.silentAlert.presentSilentToast("Producto Cambiado a No disponible automaticamente. Razon: Stock = 0", 5000)
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
