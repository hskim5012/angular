import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ContactManagerRoutingModule } from './contactmanager-routing.module';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    SidenavComponent,
    MainContentComponent,
    NotesComponent,
    NewContactDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ContactManagerRoutingModule
  ],
  providers: [UserService],
  entryComponents: [NewContactDialogComponent]
})
export class ContactManagerModule {}
