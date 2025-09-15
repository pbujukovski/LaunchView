import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ColumnDef } from '../../../utils/models/column-def.model';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
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
export class TableComponent<T> implements AfterViewInit{

  @Input() dataSource = new MatTableDataSource<T>([]);
  @Input() displayedColumns: string[] = [];
  @Input() columnDefs: ColumnDef[] = [];
  @Input() isEditAllowed: boolean = true;

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() rowAction = new EventEmitter<{ action: string; row: T }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.filterChanged.emit(value);
  }

  onSortChange(event: Sort) {
    this.sortChanged.emit(event);
  }

  onAction(action: string, row: T) {
    this.rowAction.emit({ action, row });
  }

}
