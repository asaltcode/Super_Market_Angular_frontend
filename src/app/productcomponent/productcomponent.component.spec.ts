import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcomponentComponent } from './productcomponent.component';

describe('ProductcomponentComponent', () => {
  let component: ProductcomponentComponent;
  let fixture: ComponentFixture<ProductcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
