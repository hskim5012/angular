import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/user-login/auth.service';
import { ISession, IEvent } from '../shared/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchTerm = '';
  foundSessions: ISession[];
  events: IEvent[];

  constructor(public authService: AuthService,
              private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  searchSessions(searchTerm: any) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }

}
