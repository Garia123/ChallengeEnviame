import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  constructor(public http: HttpClient) {
  }

  public getByName(name: string): Observable<any> {
    return this.http.get<any>(`${environment.url + 'characters?nameStartsWith=' + name + '&' + environment.apiKey}`);
  }

  public getAllCharacters(): Observable<any> {
    return this.http.get<any>(`${environment.url + 'characters?' + environment.apiKey}`);
  }
}
