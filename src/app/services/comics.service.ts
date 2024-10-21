import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  private apiURL = 'https://api-comics-9qrz.onrender.com';  // Aquí debes poner la URL de tu API en Render

  // Configuración de cabeceras
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todos los cómics
  getComics(): Observable<any> {
    return this.http.get(`${this.apiURL}/`, this.httpOptions)
      .pipe(
        retry(3), // Reintentar hasta 3 veces si falla
        catchError(this.handleError)
      );
  }

  // Obtener cómic por ID
  getComicById(id: number): Observable<any> {
    // Verifica si el cómic ya está en el Local Storage
    const cachedComic = localStorage.getItem(`comic_${id}`);
    if (cachedComic) {
      return of(JSON.parse(cachedComic)); // Devuelve el cómic desde Local Storage
    } else {
      // Si no está en Local Storage, realiza la solicitud HTTP
      return this.http.get(`${this.apiURL}/${id}`, this.httpOptions)
        .pipe(
          retry(3),
          tap(data => {
            // Almacena en Local Storage después de obtener el cómic
            localStorage.setItem(`comic_${id}`, JSON.stringify(data));
          }),
          catchError(this.handleError)
        );
    }
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Servidor retornó código ${error.status}, ` + `cuerpo fue: ${error.error}`);
    }
    return throwError('Algo malo sucedió; por favor intenta nuevamente más tarde.');
  }

  // Método opcional para limpiar el Local Storage de un cómic
  clearComicFromLocalStorage(id: number): void {
    localStorage.removeItem(`comic_${id}`);
  }
}
