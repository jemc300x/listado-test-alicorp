import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Category, Product } from '../../../shared/model/product';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingCotroller: HttpTestingController;

  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingCotroller = TestBed.inject(HttpTestingController);

    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {

    const expectedProducts: Product[] = [
      { id: 1, title: 'product 1', description: 'description 1', price: 10, category: Category.Electronics, image: 'img1'},
      { id: 2, title: 'product 2', description: 'description 2', price: 20, category: Category.Jewelery, image: 'img2'},
      { id: 3, title: 'product 3', description: 'description 3', price: 30, category: Category.MenSClothing, image: 'img3'},
      { id: 4, title: 'product 4', description: 'description 4', price: 40, category: Category.WomenSClothing, image: 'img4'},
    ]

    const typeOfExpect = typeof expectedProducts;

    service.getAll().subscribe(
      res => {
        const typeOfRes = typeof res;
        expect(typeOfRes).toEqual(typeOfExpect);
      }
    )
  });

  it('should delete one product', () => {
    const productDetete: Product = { id: 1, title: 'product 1', description: 'description 1', price: 10, category: Category.Electronics, image: 'img1'};
    const typeOfExpect = typeof productDetete;
    service.delete(productDetete.id).subscribe(
      (res: Product) => expect(res.id).toEqual(productDetete.id)
    )  

  })

  // it('can test HttpClient.get', () => {
  //   const testData: Product = { id: 1, title: 'product 1', description: 'description 1', price: 10, category: Category.Electronics, image: 'img1'};
  //   const testUrl: string = 'https://api.com/endpoint';
  //   httpClient.get<Product>(testUrl).subscribe(data => expect(data).toEqual(testData))
  // });

});
