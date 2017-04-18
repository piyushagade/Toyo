import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


import { 
    AngularFire, 
    AuthProviders, 
    AuthMethods, 
    FirebaseListObservable,
    FirebaseObjectObservable 
} from 'angularfire2';

@Component({
  selector: 'chat-room',
  templateUrl: '../html/chat.html',
  styleUrls: ['../app.component.css']
})
export class ChatComponent {
  items: FirebaseListObservable<any>;
  name: any;
  message: string = '';
  objects: FirebaseObjectObservable<any>;
  rooms;
  room: string;
  noMessages = false;
  baseURL: string;


  constructor(public af: AngularFire, private _router: Router) {
    this.baseURL = 'http://toyo-32ad5.firebase.com/';

    this.objects = af.database.object('/rooms', { preserveSnapshot: true });

    // retriving snapshot
    this.objects.subscribe(snapshot => {
      this.rooms = snapshot.val();
    });

    // create a chat room
    this.room = _router.url.substr(1);
    // this.objects.update({ [this.room]: ''});

    // get messages in the chatroom
    this.items = af.database.list('/rooms/' + this.room + '/messages', {
        query: {
            limitToLast: 100
        }
    });

    this.items.subscribe((response) => {
      if (response.length == 0) {
        this.noMessages = true;
      }
      else
        this.noMessages = false;
    });

    console.log(this.items);

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
    });
  }

  logout() {
     this.af.auth.logout();
  }

  chatSend(theirMessage: string) {
    let today = new Date();
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() +
     ' ' + today.getHours() + ':' + today.getMinutes() + ' ' + today.getUTCDay();

    this.items.push({ message: theirMessage, name: this.name.facebook.displayName, timestamp: today.getTime()});
    this.message = '';
  }

  handleSelection(value){
    this.message = this.message + value[0];
  }

}
