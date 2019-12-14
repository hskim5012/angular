import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar,
    private _router: Router ) {}

  ngOnInit() {}

  openAddContactDialog() {
    let dialogRef = this._dialog.open(NewContactDialogComponent, {
      width: "450px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);

      if(result){
         this.openSnackBar("Contact added", "Navigate")
         .onAction().subscribe(() => {
          this._router.navigate(['/contactmanager', result.id])
         })
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, {
      duration: 5000
    });
  }
}
