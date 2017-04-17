import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { 
    AngularFire, 
    AuthProviders, 
    AuthMethods, 
    FirebaseListObservable,
    FirebaseObjectObservable 
} from 'angularfire2';

@Component({
  selector: 'home',
  templateUrl: '../html/home.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent {
  items: FirebaseListObservable<any>;
  name: any;
  message: string = '';
  objects: FirebaseObjectObservable<any>;
  rooms;
  room: string;
  router = Router;

  public joinForm = this.fb.group({
      chatroom_name: ['', Validators.required],
  });

  constructor(public af: AngularFire, public _router: Router, public fb: FormBuilder) {
    this.objects = af.database.object('/rooms', { preserveSnapshot: true });

    // retriving snapshot
    this.objects.subscribe(snapshot => {
      this.rooms = snapshot.val();
    });

    // create a chat room
    this.room = _router.url.substr(1);
    // this.objects.update({ [this.room]: ''});

    this.items = af.database.list('/rooms/' + this.room + '/messages', {
        query: {
            limitToLast: 100
        }
    });

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  join(){
    this._router.navigate(['/' + this.joinForm.value.chatroom_name]);
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }

  logout() {
     this.af.auth.logout();
     this.name = null;
  }

  chatSend(theirMessage: string) {
    let today = new Date();
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ' ' + today.getUTCDay();
    console.log(today.getTime());

    this.items.push({ message: theirMessage, name: this.name.facebook.displayName, timestamp: today.getTime()});
    this.message = '';
  }

}
