import { SessionListComponent } from './session-list.component';
import { ISession } from '../../shared/event';


describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {

    it('should filter the sessions correctly', () => {
      component.sessions =  [
        {name: 'session1', level: 'intermedite'},
        {name: 'session2', level: 'intermedite'},
        {name: 'session3', level: 'beginner'},
       ] as ISession[];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });
  });
  it('should sort the sessions correctly', () => {
      component.sessions =  [
        {name: 'session3', level: 'intermedite'},
        {name: 'session1', level: 'intermedite'},
        {name: 'session2', level: 'beginner'},
       ] as ISession[];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('session3');
    });
});
