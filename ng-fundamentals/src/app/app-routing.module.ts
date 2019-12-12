import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events/event-list/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventsComponent } from './events/create-events/create-events.component';
import { ErrorComponent } from './error/error.component';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';
import { EventResolver } from './events/event-list/event-resolver.service';

const routes: Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/new', canDeactivate: ['canDeactivateCreateEvent'], component: CreateEventsComponent},
  { path: 'events/:id', resolve: {event: EventResolver}, component: EventDetailsComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: 'events/session/new', component: CreateSessionComponent},
  { path: '404', component: ErrorComponent},
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: '**', redirectTo: 'events', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
