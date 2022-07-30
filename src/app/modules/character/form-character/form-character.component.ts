import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from 'src/app/models/character';
import { Thumbnail } from 'src/app/models/thumbnail';
import { operation_crud } from 'src/app/shared/constants';
import { ChangeDetectorRef } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-character',
  templateUrl: './form-character.component.html',
  styleUrls: ['./form-character.component.css']
})
export class FormCharacterComponent implements OnInit, AfterContentChecked {
  public operationCreate = operation_crud.create;
  public operationUpdate = operation_crud.update;
  fileToUpload: any;
  imageUrl: any;
  imgRouteLocalPath = './../../../../assets/images/'
  public thumbnail: Thumbnail = new Thumbnail();
  @Input() operationCrud: string = '';
  @Input() character: Character = new Character();
  @Input() characters: Array<Character> = new Array<Character>();
  @Input() display = "none";
  @Output() charactersEvent: EventEmitter<Array<Character>> = new EventEmitter<Array<Character>>();
  @Output() displayEvent: EventEmitter<string> = new EventEmitter<string>();
  maxDate = new Date();
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private cdref: ChangeDetectorRef, private characterService: CharacterService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    /*if (this.operationCrud !== this.operationUpdate) {
      this.registerForm.reset();
      this.character = new Character();
    }*/
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  get f() { return this.registerForm.controls; }

  public addCharacter(): void {
    this.getCharacterByName(this.character.name);
  }

  private registrerCharacterSuccessfull(): void {
    this.character.modified = new Date();
    this.character.thumbnail = this.thumbnail;
    this.characters.push(this.character);
    this.toastr.success('Success!', 'The add character correctly.');
    this.charactersEvent.emit(this.characters);
    this.registerForm.reset();
    this.onCloseHandled();
  }

  verifyAvailableToAddCharacter(characters: Array<Character>, name: string): void {
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
    if (!this.isInvalidThumbnail()) {
      this.character.thumbnail = this.thumbnail;
    }
    for (let i = 0; i < this.characters.length; i++) {
      if (this.characters[i].id === this.character.id) {
        this.characters[i] = this.character;
      }
    }
    this.charactersEvent.emit(this.characters);
    this.onCloseHandled();
  }

  private isInvalidThumbnail(): boolean {
    return this.thumbnail.path === undefined && this.thumbnail.extension === undefined
  }

  onCloseHandled() {
    this.display = "none";
    this.displayEvent.emit(this.display);
  }

  getCharacters() {
    return this.characters;
  }

  handleFileInput(file: FileList) {

    this.fileToUpload = file.item(0);
    const nameweb = this.fileToUpload['webkitRelativePath'];
    console.log(nameweb);
    this.thumbnail.extension = this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.') + 1);
    this.thumbnail.path = this.imgRouteLocalPath + this.fileToUpload.name.slice(0, -4);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

}
