import { HttpClient } from '@angular/common/http';

export abstract class BaseService<TEntity> {
  constructor(private _http: HttpClient, private url: string) {}

  getById(id: any) {
    return this._http.get<TEntity>(`${this.url}/${id}`);
  }

  getAll() {
    return this._http.get<TEntity>(this.url);
  }

  add(context: TEntity) {
    return this._http.post(this.url, context);
  }

  update(id: any, context: TEntity) {
    return this._http.put(`${this.url}/${id}`, context);
  }

  delete(id: any) {
    return this._http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getByUrlId(urlId: string) {
    return this._http.get<TEntity>(`${this.url}/${urlId}`);
  }
}
