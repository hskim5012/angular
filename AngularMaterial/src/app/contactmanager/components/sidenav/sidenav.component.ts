import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;

  constructor(zone: NgZone, private _userService: UserService, private _breakpointoObserver: BreakpointObserver
    ,         private router: Router
    ) {
    // this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
    // this.mediaMatcher.addEventListener('change', () => (mql: MediaQueryList) => zone.run(() => this.mediaMatcher = mql))

  }

  ngOnInit() {
    this.users = this._userService.users;
    this._userService.loadAll();

    this.users.subscribe(data => {
      if (data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    });
  }

  isScreenSmall(): boolean {
    return this._breakpointoObserver.isMatched([ Breakpoints.Small, Breakpoints.XSmall]);
  }
}
