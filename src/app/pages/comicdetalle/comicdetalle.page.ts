import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-comicdetalle',
  templateUrl: './comicdetalle.page.html',
  styleUrls: ['./comicdetalle.page.scss'],
})
export class ComicdetallePage implements OnInit, OnDestroy {

  comic: any; // Variable para almacenar el cómic

  constructor(
    private route: ActivatedRoute,
    private comicsService: ComicsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const comicId = +(params.get('id') ?? 0);  // Obtener el ID del cómic desde la URL
      if (comicId !== 0) {  // Verificar que comicId sea válido
        this.comicsService.getComicById(comicId).subscribe((data) => {
          this.comic = data;  // Asignar la información del cómic
        });
      }
    });
  }

  ngOnDestroy() {
    // Limpiar el Local Storage si es necesario
    // localStorage.removeItem(`comic_${this.comic.id}`); // Descomentar si deseas limpiar al salir
  }
}
