import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[];
  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Note>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // * So a simple workaround/solution would be to define a sortingDataAccessor that doesn't coerce values to numbers
    this.dataSource.sortingDataAccessor = (data, header) =>
      data[header];
  }

  applyFilter(filterValue: string) {
    // ! MatTableSource defaults to lowercase match
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
