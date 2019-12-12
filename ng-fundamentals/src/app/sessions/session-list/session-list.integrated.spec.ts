import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/user-login/auth.service';
import { VoterService } from '../../events/event-details/voter.service';
import { ISession } from '../../shared/event';
import { By} from '@angular/platform-browser';
import { UpVoteComponent } from 'src/app/events/event-details/upvote.component';
import { DurationPipe } from 'src/app/shared/duration.pipe';
import { CollapsibleWellComponent } from 'src/app/common/collapsible-well.component';


describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let fixture: ComponentFixture<SessionListComponent>;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    const mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joann'}
    };
    const mockVoterService = {
      userHasVoted: () => true,
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations:
      [
      SessionListComponent,
      UpVoteComponent,
      DurationPipe,
      CollapsibleWellComponent,
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: VoterService, useValue: mockVoterService}
      ],
      schemas: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {
    it('should have the correct session title', () => {
      component.sessions = [{id: 3, name: 'session 1', presenter: 'joe', duration: 1, level: 'beginner',
    abstract: 'abstract', voters: ['jo', 'joann']}];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      // expect(element.querySelector('[well-title]').textContent).toContain('session 1');
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1');

    });
  });

});
