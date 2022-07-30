import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../models/character';
import { characters, name_starts_with } from '../shared/constants';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService<any> {
  constructor(public http: HttpClient) {
    super(http, environment.url + characters + '?' + environment.apiKey);
  }

  getByName(name) {
    return this.http.get<any>(`${environment.url + characters + '?' + name_starts_with + '=' + name + '&' + environment.apiKey}`);
  }

  getAllCharacters() {
    return this.http.get<any>(`${environment.url + characters + '?' + environment.apiKey}`);
  }


}
