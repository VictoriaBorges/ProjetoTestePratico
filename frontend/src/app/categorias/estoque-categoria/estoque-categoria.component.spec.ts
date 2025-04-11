import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueCategoriaComponent } from './estoque-categoria.component';

describe('EstoqueCategoriaComponent', () => {
  let component: EstoqueCategoriaComponent;
  let fixture: ComponentFixture<EstoqueCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
