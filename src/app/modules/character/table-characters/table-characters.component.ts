import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { operation_crud } from 'src/app/shared/constants';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormCharacterComponent } from '../form-character/form-character.component';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styleUrls: ['./table-characters.component.scss'],
})
export class TableCharactersComponent implements OnInit {
  public display: string;
  characters: Array<Character> = new Array<Character>();
  @Output() characterEvent: EventEmitter<Character> = new EventEmitter<Character>();
  @Output() charactersEvent: EventEmitter<Array<Character>> = new EventEmitter<Array<Character>>();
  @ViewChild('formCharacter') formCharacter: FormCharacterComponent;

  constructor(private characterService: CharacterService, private toastr: ToastrService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  private getCharacters(): void {
    this.characterService.getAll().subscribe(
      (response) => {
        this.characters = response.data.results as Character[];
        this.formCharacter.characters = this.characters;
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }

  onGetCharacters(event){
    this.characters = event;
  }

  onEditItem(index: number) {
    this.formCharacter.character = this.characters[index];
    this.formCharacter.indexCharacter = index;
    this.formCharacter.editMode = true;
    this.formCharacter.editCharacter();
  }

  public searchCharacter(event) {
    const value = event.target.value;
    this.characterService.getByName(value).subscribe(
      (response) => {
        this.characters = response.data.results;
        this.formCharacter.characters = this.characters;
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }
}
