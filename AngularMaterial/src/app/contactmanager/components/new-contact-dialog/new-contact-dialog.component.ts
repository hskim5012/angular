import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {
  user: User;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService) {}

  name = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.user = new User();
  }

  getErrorMessage() {
    return this.name.hasError('required')
      ? 'You must enter a name' : '';
  }



  save() {
    this.userService.addUser(this.user).then( user => {
      this.dialogRef.close(user);
    })
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}
