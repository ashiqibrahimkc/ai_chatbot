import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

   private apiUrl =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${environment.geminiApiKey}`

  constructor(private http:HttpClient) { }

  sendMessage(message:string):Observable<any>{
    const body = { contents: [{ parts: [{ text: message }] }] };
    return this.http.post(this.apiUrl,body)
  }
}
