import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-juguetes',
  templateUrl: './juguetes.page.html',
  styleUrls: ['./juguetes.page.scss'],
})
export class JuguetesPage implements OnInit {
  jugueteSelect: any;
  arregloJuguetes: any[] = [];
  juguetesFiltrados: any[] = []; // Para almacenar los juguetes filtrados

  constructor(private alertasService: AlertasService, private bd: ManejodbService, private router: Router) {}

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchJuguetes().subscribe(res => {
          this.arregloJuguetes = res;
          this.juguetesFiltrados = res; // Inicializar con todos los juguetes
        });
      }
    });
  }

  irJugueteUnico(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        jugueteSelect: x
      }
    };
    this.router.navigate(['/jugueteunico'], navigationExtras);
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias!');
  }

  buscarJuguete(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    // Si el campo de búsqueda está vacío, mostramos todos los juguetes
    if (textoBusqueda.trim() === '') {
      this.juguetesFiltrados = this.arregloJuguetes;
    } else {
      // Filtrar los juguetes según el texto de búsqueda
      this.juguetesFiltrados = this.arregloJuguetes.filter(juguete =>
        juguete.nombre_prod.toLowerCase().includes(textoBusqueda)
      );
    }
  }
}
