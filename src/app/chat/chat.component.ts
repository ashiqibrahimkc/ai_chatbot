import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatserviceService } from '../service/chatservice.service';
import { response } from 'express';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput: string = '';

  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private chatService: ChatserviceService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user' });

    const userMessage = this.userInput;
    this.userInput = '';

    setTimeout(() => this.scrollToBottom(), 100);

   
    this.chatService.sendMessage(userMessage).subscribe(response => {
      let botReply = response.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't understand.";
      botReply = botReply.replace(/\*/g, '');
      this.messages.push({ text: botReply, sender: 'bot' });

      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  private scrollToBottom() {
    if (this.chatBox) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }
}

