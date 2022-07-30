import { Component, OnInit, ViewChild } from '@angular/core';
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
  public characters: Array<Character> = new Array<Character>();
  public operationCrud: string = '';
  public operationCreate = operation_crud.create;
  public operationUpdate = operation_crud.update;
  @ViewChild('formCharacter', { static: false })
  formCharacter?: FormCharacterComponent
  constructor() { }

  public ngOnInit() {

  }

  public onGetDisplayModal(display: string) {
    this.display = display;
  }

  public onGetCharacters(characters: Array<Character>): void {
    this.characters = characters;
  }

  public getCharacters(){
    return this.characters;
  }
  public openModalCreateCharacter(): void {
    this.display = "block";
    this.operationCrud = this.operationCreate;
  }

  public onGetCharacterToEdit(character: Character): void {
    this.character = character;
    this.operationCrud = this.operationUpdate;
  }

}
