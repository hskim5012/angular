import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/event.service';
import { IEvent } from 'src/app/shared/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent implements OnInit {
  events: IEvent[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEventsFromService();
    // this.events = this.eventService.getEvents();
  }

  getEventsFromService() {
    const observable = this.eventService.getEvents();
    observable.subscribe(events => {
      console.log('Got our events!', events);
      this.events = events;
    });
  }
}
