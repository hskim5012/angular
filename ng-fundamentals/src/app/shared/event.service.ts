import { Injectable, EventEmitter } from '@angular/core';
import { IEvent, ISession } from './event';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

  getEvents(): Observable < IEvent[] > {
    return this.http.get<IEvent[]>('/api/events')
      .pipe(catchError(this.handleError < IEvent[] > ('getEvents', [])));
  }


  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>('/api/events/' + id)
    .pipe(catchError(this.handleError<IEvent>('getEvent')));
  }

  saveEvent(event) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<IEvent>('/api/events', event, options)
      .pipe(catchError(this.handleError<IEvent>('saveEvent')));
  }

  // Need to find the existing event in the array, and replace it for now
  // updateEvent(event) {
  //   const index = EVENTS.findIndex(x => x.id = event.id);
  //   console.log(index);
  //   EVENTS[index] = event;
  // }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
      .pipe(catchError(this.handleError<ISession[]>('searchSessions')));
  }

  // ! no longer needed since using server
  // searchSessions(searchTerm: string) {
  //   const term = searchTerm.toLowerCase();
  //   let results: ISession[] = [];
  //   EVENTS.forEach(event => {
  //     let matchingSessions = event.sessions.filter(session => session.name.toLocaleLowerCase().indexOf(term) > -1);
  //     matchingSessions = matchingSessions.map((session: any) => {
  //       session.eventId = event.id;
  //       return session;
  //     });
  //     results = results.concat(matchingSessions);
  //   });

  private handleError < T >(operation = 'operation', result ?: T) {
    return (error: any): Observable < T > => {
      console.log(error);
      return of(result as T);
    };
  }
}
