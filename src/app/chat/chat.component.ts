import {Component} from '@angular/core';

import {ChatService} from './chat.service';
import {ProfileService} from '../services/profile-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ChatService],
})
export class ChatComponent {

  messages: any[];

  constructor(protected chatService: ChatService, private router: Router) {
    ProfileService.profileFunction = () => {
      if (!ProfileService.loaded) {
        this.router.navigate(['/home']);
      } else {
        this.messages = this.chatService.loadMessages();
      }
    };
  }

  sendMessage(event: any) {
    console.log('chat');
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(parseInt(event.message)),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: ProfileService.profileData.data.name ? ProfileService.profileData.data.name : 'بدون نام',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }
}
