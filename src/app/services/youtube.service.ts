import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser'; // Asegúrate de haber instalado este plugin

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  constructor() {}

  openVideo(videoId: string) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Browser.open({ url });
  }
}
