import { TestBed } from '@angular/core/testing';
import { AlertasSilenciosasService } from './alertasilenciosa.service'; // Asegúrate de usar el nombre correcto

describe('AlertasSilenciosasService', () => {
  let service: AlertasSilenciosasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertasSilenciosasService); // Usa el nombre correcto aquí también
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
