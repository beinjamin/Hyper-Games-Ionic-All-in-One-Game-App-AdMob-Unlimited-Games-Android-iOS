import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  apiUrl = '../../assets/db/games.json';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

getData() {
  return this.http.get<any>(this.apiUrl, this.httpOptions);
}

}
