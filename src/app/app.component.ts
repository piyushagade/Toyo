import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string = '';

  constructor(public af: AngularFire, private _router:Router) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 5
      }
    });

    console.log(_router.url);

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }

  logout() {
     this.af.auth.logout();
  }

  chatSend(theirMessage: string) {
    this.items.push({ message: theirMessage, name: this.name.facebook.displayName});
    this.msgVal = '';
  }

}
