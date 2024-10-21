import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaraService } from 'src/app/services/camara.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-editarconsola',
  templateUrl: './editarconsola.page.html',
  styleUrls: ['./editarconsola.page.scss'],
})
export class EditarconsolaPage implements OnInit {

  consolaLlego: any;  // Los datos de la consola que llegan
  estatus: string = '';  // El estatus actual de la consola (Disponible/No disponible)
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
        this.consolaLlego = { ...this.router.getCurrentNavigation()?.extras?.state?.['consolaSelect'] };

        // Asegurarse de que el estatus se asigna correctamente
        if (this.consolaLlego.estatus != null) {
          this.estatus = this.consolaLlego.estatus.toString();  // Convertir a string para que coincida con los valores del select
          console.log('Estatus recibido y asignado:', this.estatus);  // Log para verificar el valor inicial
        } else {
          this.estatus = '1';  // Valor predeterminado si el estatus no está definido
        }
      }
    });
  }

  ngOnInit() {}

  // Método para guardar los cambios de la consola
  async guardarCambios() {
    this.resetErrores();

    // Validación de campos
    if (!this.consolaLlego.nombre_prod || this.consolaLlego.precio_prod === null || 
        !this.consolaLlego.descripcion_prod || this.consolaLlego.stock_prod === null || 
        !this.consolaLlego.foto_prod || !this.estatus) {
      this.errorCampos = true;
      return;
    }

    if (this.consolaLlego.precio_prod < 0) {
      this.errorPrecio = true;
      return;
    }

    if (this.consolaLlego.stock_prod < 0) {
      this.errorStock = true;
      return;
    }

    try {
      // Verificar el valor de estatus antes de guardarlo
      console.log('Estatus seleccionado antes de modificar:', this.estatus);  // Log para verificar el valor antes de actualizar

      await this.bd.modificarConsola(
        this.consolaLlego.id_producto, 
        this.consolaLlego.nombre_prod, 
        this.consolaLlego.precio_prod, 
        this.consolaLlego.stock_prod, 
        this.consolaLlego.descripcion_prod, 
        this.consolaLlego.foto_prod, 
        this.estatus  // Utilizar la variable "estatus" para modificar el estado
      ); 

      this.router.navigate(['/crudconsolas']);
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
        this.consolaLlego.foto_prod = fotoUrl;  // Asigna la URL de la imagen
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
      this.consolaLlego.precio_prod = Math.floor(this.consolaLlego.precio_prod || 0);  // Redondea hacia abajo si es decimal
    } else if (campo === 'stock') {
      this.consolaLlego.stock_prod = Math.floor(this.consolaLlego.stock_prod || 0);  // Redondea hacia abajo si es decimal
    }
  }

  // Método para volver sin cambiar valores
  volver() {
    this.router.navigate(['/crudconsolas']);
  }
}
