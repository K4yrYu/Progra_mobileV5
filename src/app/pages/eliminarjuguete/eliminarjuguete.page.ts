import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManejodbService } from 'src/app/services/manejodb.service';

@Component({
  selector: 'app-eliminarjuguete',
  templateUrl: './eliminarjuguete.page.html',
  styleUrls: ['./eliminarjuguete.page.scss'],
})
export class EliminarjuguetePage implements OnInit {

  jugueteLlego: any;

  constructor(private bd: ManejodbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.jugueteLlego = this.router.getCurrentNavigation()?.extras?.state?.['jugueteSelect'];
      }
    });
  }

  ngOnInit() {
    // Aquí no necesitas hacer otra consulta si ya tienes el juguete
  }

  async eliminarJuguete() {
    if (this.jugueteLlego?.id_producto) {
      await this.bd.eliminarJuguete(this.jugueteLlego.id_producto);
      await this.router.navigate(['/crudjuguetes']);
    }
  }
}
