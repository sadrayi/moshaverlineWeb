import {AfterViewInit, Component, OnInit} from '@angular/core';

import {ChatService} from './chat.service';
import {ProfileService} from '../services/profile-service';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {LocalStorageService} from '../services/local-storage.service';

interface Message {
  id: number,
  text: string,
  createdAt: Date,
  user: {
    id: string,
    name: string,
    avatar: string,
    online: boolean
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ChatService],
})
export class ChatComponent implements OnInit, AfterViewInit {
  socket: SocketIOClient.Socket;

  firstConnect = true;

  messages = [];

  constructor(private router: Router, private localStorage: LocalStorageService) {
    ProfileService.profileFunction = () => {
      if (!ProfileService.loaded) {
        this.router.navigate(['/home']);
      } else {
        this.socket = io.connect(environment.ws_url);
        console.log({id: localStorage.getUserId(), token: localStorage.getUserToken(), type: 'user'})
        this.socket.on('connect', () => {
          console.log('connected');
          this.socket.emit('login', {id: localStorage.getUserId(), token: localStorage.getUserToken(), type: 'user'});
        });
          this.socket.on('disconnect', () => {
          console.log('disconnected');
        });
        this.socket.on('login_message', (messages) => {
          console.log(messages)
          if (this.firstConnect)
            messages.forEach((message) => {
              this.messages.push({
                text: message.text,
                date: message.createdAt,
                reply: true,
                type: 'text',
                user: {
                  name: message.user.name,
                  avatar: 'http://admin.moshaverline.com/' + message.user.avatar,
                },
              });
            });
          this.firstConnect = false;
        });
        this.socket.on('new_text_message_recived', (message) => {
          console.log('new_text_message');
          this.messages.push({
            text: message.text,
            date: message.createdAt,
            reply: true,
            type: 'text',
            user: {
              name: message.user.name,
              avatar: 'http://admin.moshaverline.com/' + message.user.avatar,
            },
          });
        });
      }
    };
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
  }

  sendMessage(event: any) {
    console.log('chat: ' + event.message);
    /*
        const files = !event.files ? [] : event.files.map((file) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'nb-compose',
          };
        });*/

    this.socket.emit('new_text_message', event.message);


  }
}
