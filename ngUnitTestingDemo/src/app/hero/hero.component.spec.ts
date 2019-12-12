import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });


  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 14, name: 'Robert', strength: 62};
    expect(fixture.componentInstance.hero.name).toEqual('Robert');
  });

  it('should render the correct hero name in anchor tag', () => {
    fixture.componentInstance.hero = { id: 14, name: 'Robert', strength: 62 };
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Robert');
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Robert')
  });
});
