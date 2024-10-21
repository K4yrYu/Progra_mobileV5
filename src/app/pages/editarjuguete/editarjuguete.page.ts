import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-editarjuguete',
  templateUrl: './editarjuguete.page.html',
  styleUrls: ['./editarjuguete.page.scss'],
})
export class EditarjuguetePage implements OnInit {

  jugueteLlego: any;  // Los datos del juguete que llegan
  estatus: string = '';  // El estatus actual del juguete (Disponible/No disponible)
  estados = [
    { value: '1', viewValue: 'Disponible' },
    { value: '0', viewValue: 'No disponible' }
  ];

  // Variables de control para los mensajes de error
  errorCampos: boolean = false;
  errorPrecio: boolean = false;
  errorStock: boolean = false;
  errorImagen: boolean = false;

  constructor(
    private router: Router,
    private bd: ManejodbService,
    private activedroute: ActivatedRoute,
    private camaraService: CamaraService
  ) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.jugueteLlego = { ...this.router.getCurrentNavigation()?.extras?.state?.['jugueteSelect'] };

        // Asegurarse de que el estatus se asigna correctamente
        if (this.jugueteLlego.estatus != null) {
          this.estatus = this.jugueteLlego.estatus.toString();  // Convertir a string para que coincida con los valores del select
          console.log('Estatus recibido y asignado:', this.estatus);  // Log para verificar el valor inicial
        } else {
          this.estatus = '1';  // Valor predeterminado si el estatus no está definido
        }
      }
    });
  }

  ngOnInit() {}

  // Método para guardar los cambios del juguete
  async guardarCambios() {
    this.resetErrores();

    // Validación de campos
    if (!this.jugueteLlego.nombre_prod || this.jugueteLlego.precio_prod === null || 
        !this.jugueteLlego.descripcion_prod || this.jugueteLlego.stock_prod === null || 
        !this.jugueteLlego.foto_prod || !this.estatus) {
      this.errorCampos = true;
      return;
    }

    if (this.jugueteLlego.precio_prod < 0) {
      this.errorPrecio = true;
      return;
    }

    if (this.jugueteLlego.stock_prod < 0) {
      this.errorStock = true;
      return;
    }

    try {
      // Verificar el valor de estatus antes de guardarlo
      console.log('Estatus seleccionado antes de modificar:', this.estatus);  // Log para verificar el valor antes de actualizar

      await this.bd.modificarJuguete(
        this.jugueteLlego.id_producto, 
        this.jugueteLlego.nombre_prod, 
        this.jugueteLlego.precio_prod, 
        this.jugueteLlego.stock_prod, 
        this.jugueteLlego.descripcion_prod, 
        this.jugueteLlego.foto_prod, 
        this.estatus  // Utilizar la variable "estatus" para modificar el estado
      ); 

      this.router.navigate(['/crudjuguetes']);
    } catch (error) {
      console.error('Error al guardar cambios:', error);  // Manejo del error
    }
  }

  // Resetear los errores
  private resetErrores() {
    this.errorCampos = false;
    this.errorPrecio = false;
    this.errorStock = false;
    this.errorImagen = false;
  }

  // Método para tomar una foto
  async tomarFoto() {
    try {
      const fotoUrl = await this.camaraService.takePicture();
      if (fotoUrl) {
        this.jugueteLlego.foto_prod = fotoUrl;  // Asigna la URL de la imagen
        this.errorImagen = false;  // Limpia el error si se toma la foto
      } else {
        this.errorImagen = true;  // Manejo si no se devuelve una imagen
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.errorImagen = true;  // Mostrar mensaje de error si algo falla
    }
  }

  // Método para validar que los valores de precio y stock sean enteros
  validarNumeroEntero(campo: string) {
    if (campo === 'precio') {
      this.jugueteLlego.precio_prod = Math.floor(this.jugueteLlego.precio_prod || 0);  // Redondea hacia abajo si es decimal
    } else if (campo === 'stock') {
      this.jugueteLlego.stock_prod = Math.floor(this.jugueteLlego.stock_prod || 0);  // Redondea hacia abajo si es decimal
    }
  }

  // Método para volver sin cambiar valores
  volver() {
    this.router.navigate(['/crudjuguetes']);
  }
}
