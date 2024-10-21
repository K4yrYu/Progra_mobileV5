import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsolaunicaPage } from './consolaunica.page';

describe('ConsolaunicaPage', () => {
  let component: ConsolaunicaPage;
  let fixture: ComponentFixture<ConsolaunicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolaunicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
