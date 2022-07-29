import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  @Input() toast: Toast;
  @Input() i: number;
  @Output() remove = new EventEmitter<number>();
}
