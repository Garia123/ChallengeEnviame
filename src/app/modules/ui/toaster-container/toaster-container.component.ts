import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/models/toast';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.css']
})
export class ToasterContainerComponent implements OnInit {
  public toasts: Toast[] = [];

  constructor(private toaster: ToasterService) {}

  public ngOnInit(): void {
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 6000);
      });
  }

  public remove(index: number): void {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }
}
