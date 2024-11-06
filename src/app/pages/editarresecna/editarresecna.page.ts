import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarresecna',
  templateUrl: './editarresecna.page.html',
  styleUrls: ['./editarresecna.page.scss'],
})
export class EditarresecnaPage implements OnInit {
  // Variables para la reseña
  resecna = {
    nombre_prod: 'Producto Ejemplo',
    username: 'Usuario Ejemplo',
    text_resecna: 'Esta es una reseña de ejemplo',
    estado: 'disponible', // Estado inicial
    motivoBaneo: '' // Motivo del baneo
  };

  // Lista de estados para el selector
  estados = [
    { value: 'disponible', viewValue: 'Disponible' },
    { value: 'baneado', viewValue: 'Baneado' }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  onEstadoChange() {
    // Limpia el motivo del baneo si el estado cambia a "disponible"
    if (this.resecna.estado === 'disponible') {
      this.resecna.motivoBaneo = '';
    }
  }

  guardarCambios() {
    // Verifica si se necesita el motivo del baneo
    if (this.resecna.estado === 'baneado' && !this.resecna.motivoBaneo) {
      alert('Por favor, ingresa el motivo del baneo');
      return;
    }
    
    // Lógica para guardar los cambios aquí
    console.log('Cambios guardados:', this.resecna);

    // Redirigir a la página de CRUD reseñas
    this.router.navigate(['/crudresecnas']);
  }
}
