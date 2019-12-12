import {  Injectable } from '@angular/core';
import { ISession } from 'src/app/shared/event';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) {}

    // deleteVoter(session: ISession, voterName: string) {
    //     session.voters = session.voters.filter(voter => voter !== voterName);
    // }

    addVoter(eventId: number, session: ISession, voterName: string) {
      session.voters.push(voterName);
      const url = `/api/events/${eventId}/session/${session.id}/voters/${voterName}`;
      const options = {headers: new HttpHeaders({'Content-type': '/application/json'})};
      this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoter')))
      .subscribe();
    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
      session.voters = session.voters.filter(voter => voter !== voterName);

      const url = `/api/events/${eventId}/session/${session.id}/voters/${voterName}`;
      this.http.delete(url).pipe(catchError(this.handleError('deleteVoter'))).subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
