import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../service/product.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let productServiceStub: Partial<ProductService>;

  beforeEach(async () => {

    productServiceStub = {
      delete: () => of(true),
      getAll: () => of([])
    }

    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ MatDialogModule, MatSnackBarModule ],
      providers: [ { provide: ProductService, useValue: productServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
