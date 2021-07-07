import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/shared/model/product';
import { MessageDialogComponent } from '../../../../shared/components/message-dialog/message-dialog.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['code', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource<Product>([]);
  private destroy$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _productService: ProductService
  ){}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(item: Product): void {
    this.onOpenDialog(item);
  }

  onOpenDialog(item: Product): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {title: 'Confirmación', message: `¿Esta seguro que desea eliminar este registro << ${ item.title } >> ?`}
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (!res) return;
        this._productService.delete(item.id).pipe(takeUntil(this.destroy$)).subscribe(
          res => {            
            this.dataSource.data = this.dataSource.data.filter(product => product.id !== item.id);
            this._snackBar.open(`El registro << ${ item.title } >> se elimino satisfactoriamente`,undefined, {
              duration: 2000,
              verticalPosition: 'top'
            });
          },
          err => console.error(err)
        )
      }
    );
  }

  getAllProduct() {
    this._productService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
      res => this.dataSource.data = res,
      err => {
        console.error(err);
        let snackBarRef = this._snackBar.open(`Upss.!!! la api no responde.`,'Recargar', {
          verticalPosition: 'top'
        });
        snackBarRef.onAction().subscribe(res => this.getAllProduct());
        snackBarRef.dismiss();
      }
    );
  }
}
