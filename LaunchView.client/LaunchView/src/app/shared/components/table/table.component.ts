import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ColumnDef } from '../../../utils/models/column-def.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> implements AfterViewInit {

  @Input() dataSource = new MatTableDataSource<T>([]);
  @Input() displayedColumns: string[] = [];
  @Input() columnDefs: ColumnDef[] = [];
  @Input() isEditAllowed = true;
  @Input() length = 0;                         
  @Input() pageIndex = 0;              
  @Input() pageSize = 10;                 
  @Input() pageSizeOptions: number[] = [5,10,25,50];
  @Input() sortBy: string | null = null;      
  @Input() sortDir: 'asc' | 'desc' | '' = '';  

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() rowAction = new EventEmitter<{ action: string; row: T }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
   
    //this.dataSource.sort = this.sort;

    // this.paginator.page.subscribe(ev => this.pageChanged.emit(ev));
    // this.sort.sortChange.subscribe(ev => this.sortChanged.emit(ev));
  }


  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.filterChanged.emit(value);
  }

  onSortChange(event: Sort) {
    this.sortChanged.emit(event);
    this.paginator.firstPage(); 
   }

  onAction(action: string, row: T) {
    this.rowAction.emit({ action, row });
  }
}
