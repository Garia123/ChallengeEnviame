import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from 'src/app/models/character';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ChangeDetectorRef } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-character',
  templateUrl: './form-character.component.html',
  styleUrls: ['./form-character.component.css']
})
export class FormCharacterComponent implements OnInit {
  public subscription: Subscription;
  public editMode = false;
  public fileToUpload: any;
  public indexCharacter = 0;
  public imageUrl: any;
  public imgRouteLocalPath = '../../../../assets/images/';
  public characters: Array<Character> = new Array<Character>();
  public character: Character = new Character();
  public thumbnail: Thumbnail = new Thumbnail();
  public registerForm: FormGroup;
  @Input() operationCrud: string = '';
  @Output() displayEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() charactersEvent: EventEmitter<Array<Character>> = new EventEmitter<Array<Character>>();

  constructor(private fb: FormBuilder, private cdref: ChangeDetectorRef, private characterService: CharacterService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  get f() { return this.registerForm.controls; }

  public submit(): void {
    if (this.editMode) {
      this.registrerCharacterSuccessfull();
    }
    else {
      this.getCharacterByName(this.registerForm.value.name);
    }
  }

  private registrerCharacterSuccessfull(): void {
    const value = this.registerForm.value;
    const newCharacter = new Character();
    newCharacter.name = value.name;
    newCharacter.description = value.description;
    newCharacter.modified = new Date();
    newCharacter.thumbnail = this.thumbnail;
    if (!this.editMode) {
      this.characters.push(newCharacter);
      this.toastr.success('Success!', 'The add character correctly.');
    }
    else {
      this.characters[this.indexCharacter] = newCharacter;
      this.editMode = false;
      this.toastr.success('Success!', 'The update character correctly.');
    }
    this.clearForm();
    this.charactersEvent.emit(this.characters);
  }


  private verifyAvailableToAddCharacter(characters: Array<Character>, name: string): void {
    let characterObtained = characters.filter((c) => c.name === name);
    if (characterObtained.length == 0) {
      this.registrerCharacterSuccessfull();
    }
    else {
      this.toastr.error('Error!', 'The character already exists');
    }
  }

  public getCharacterByName(name: string): void {
    this.characterService.getByName(name).subscribe(
      (response) => {
        let characters = response.data.results;
        this.verifyAvailableToAddCharacter(characters, name);
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }

  public editCharacter(): void {
    this.registerForm.setValue({
      name: this.character.name,
      description: this.character.description,
    })
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.thumbnail.extension = this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.') + 1);
    this.thumbnail.path = this.imgRouteLocalPath + this.fileToUpload.name.slice(0, -4);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  public clearForm(): void {
    this.registerForm.reset();
    this.imageUrl = "";
  }
}
