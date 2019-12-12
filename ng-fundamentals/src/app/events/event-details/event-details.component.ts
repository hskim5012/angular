import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/event.service';
import { ActivatedRoute, Params} from '@angular/router';
import { IEvent, ISession } from 'src/app/shared/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: IEvent;
  addMode: boolean;
  filterBy = 'all'; // binded in the event-details.html [filterBy]
  sortBy = 'votes';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.data.forEach((data) => {
        this.event = data.event;
        this.addMode = false;
        // need to keep track of state when using route parameter change
    });
    // this.event = this.eventService.getEvent(+this.route.snapshot.params.id);
  }

  // * Toggle add mode
  addSession() {
    this.addMode = true;
  }

  // Creating an ID for the new event being added
  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    // console.log('Pre-Adding session value of ', nextId);
    session.id = nextId + 1;
    this.event.sessions.push(session);
    // console.log('ID should have been pushed successful ', session);
    this.eventService.saveEvent(this.event).subscribe(() => console.log('Created New Event'));
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }

}
