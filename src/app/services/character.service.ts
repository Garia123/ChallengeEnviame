import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  constructor(public http: HttpClient) {
  }

  getByName(name) {
    return this.http.get<any>(`${environment.url + 'characters?nameStartsWith=' + name + '&' + environment.apiKey}`);
  }

  getAllCharacters() {
    return this.http.get<any>(`${environment.url + 'characters?' + environment.apiKey}`);
  }
}
