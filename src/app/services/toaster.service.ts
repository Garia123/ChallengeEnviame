import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../models/toast';
import { ToastType } from '../shared/constants';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public subject: BehaviorSubject<Toast>;
  public toast$: Observable<Toast>;

  constructor() {
    this.subject = new BehaviorSubject<Toast>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  }

  public show(type: ToastType, title?: string, body?: string, delay?: number): void {
    this.subject.next({ type, title, body, delay });
  }
}
