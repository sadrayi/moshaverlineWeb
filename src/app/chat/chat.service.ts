import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

import {messages} from './messages';
import {LocalStorageService} from '../services/local-storage.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ChatService {
  messageText: string;
  messages: Array<any>;
  socket: SocketIOClient.Socket;

  // Our constructor calls our wsService connect method
  constructor(private localStorage: LocalStorageService) {
    this.socket = io.connect(environment.ws_url);

    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.emit('login', {id: localStorage.getUserId(), token: localStorage.getUserToken(), type: 'user'});
    });
    this.socket.on('disconnect',()=>{
      console.log('disconnected');
    })

  }

  loadMessages() {
    return messages;
  }

  sendMessage(message: string) {
    this.socket.emit('new_text_message', message);
  }
}
