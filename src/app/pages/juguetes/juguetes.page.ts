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
  jugueteSelect: any; // Juguete seleccionado
  arregloJuguetes: any[] = []; // Todos los juguetes
  juguetesFiltrados: any[] = []; // Juguetes filtrados por búsqueda

  constructor(
    private alertasService: AlertasService,
    private bd: ManejodbService,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar todos los juguetes al iniciar
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchJuguetes().subscribe(res => {
          this.arregloJuguetes = res;
          this.juguetesFiltrados = res; // Mostrar todos los juguetes al inicio
        });
      }
    });
  }

  irJugueteUnico(juguete: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        jugueteSelect: juguete
      }
    };
    this.router.navigate(['/jugueteunico'], navigationExtras);
  }

  compra() {
    this.alertasService.presentAlert('Añadido al carro', '¡Gracias por tu compra!');
  }

  buscarJuguete(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    if (textoBusqueda.trim() === '') {
      this.juguetesFiltrados = this.arregloJuguetes; // Mostrar todos si no hay búsqueda
    } else {
      this.juguetesFiltrados = this.arregloJuguetes.filter(juguete =>
        juguete.nombre_prod.toLowerCase().includes(textoBusqueda)
      );
    }
  }
}
