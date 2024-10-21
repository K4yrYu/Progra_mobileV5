import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicdetallePage } from './comicdetalle.page';

describe('ComicdetallePage', () => {
  let component: ComicdetallePage;
  let fixture: ComponentFixture<ComicdetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
