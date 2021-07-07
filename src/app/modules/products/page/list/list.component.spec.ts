import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Category, Product } from 'src/app/shared/model/product';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../service/product.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let productServiceStub: Partial<ProductService>;

  beforeEach(async () => {

    productServiceStub = {
      delete: (productId: number): Observable<Product> => {
        const productDelete: Product = { id: 1, title: 'product 1', description: 'description 1', price: 10, category: Category.Electronics, image: 'img1'};
        return of(productDelete);
      },
      getAll: () => of([])
    }

    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ SharedModule, BrowserAnimationsModule ],
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
