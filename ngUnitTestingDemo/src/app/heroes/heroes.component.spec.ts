import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
  let component: HeroesComponent
  let HEROES;
  let mockHeroSerive;

  beforeEach(()=> {
    HEROES = [
      { id: 1, name: 'Mr. Scary', strength: 8 },
      { id: 2, name: 'Joann', strength: 55 },
      { id: 3, name: 'Mary', strength: 24 },
    ];

    mockHeroSerive = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    component = new HeroesComponent(mockHeroSerive)
  })

  describe('delete', () => {
    it('should remove  the hero from the list', () => {
      mockHeroSerive.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero', () => {
      mockHeroSerive.deleteHero.and.returnValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroSerive.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });

  });

});

