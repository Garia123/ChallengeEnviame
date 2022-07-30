import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Character } from '../models/character';
import { FormCharacterComponent } from '../modules/character/form-character/form-character.component';
import { operation_crud } from '../shared/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public display: string = "none";
  public character: Character = new Character();
   //public characters: Array<Character> = new Array<Character>();
  public operationCrud: string = '';
  public operationCreate = operation_crud.create;
  public operationUpdate = operation_crud.update;
  subject = new Subject<Character>();

  constructor() { }

  public ngOnInit() {

  }

  public onGetDisplayModal(display: string) {
    this.display = display;
  }

  public onGetCharacters(characters: Array<Character>): void {
   // this.characters = characters;
  }


  public openModalCreateCharacter(): void {
    this.display = "block";
    this.operationCrud = this.operationCreate;
  }

  public onGetCharacterToEdit(character: Character): void {
    this.operationCrud = this.operationUpdate;
    this.character = character;
  }

}
