import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { operation_crud } from 'src/app/shared/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styleUrls: ['./table-characters.component.scss'],
})
export class TableCharactersComponent implements OnInit {
  public display: string;
  character:Character = new Character();
  @Input() characters: Array<Character> = new Array<Character>();
  @Output() displayEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() characterEvent: EventEmitter<Character> = new EventEmitter<Character>();
  @Output() charactersEvent: EventEmitter<Array<Character>> = new EventEmitter<Array<Character>>();

  constructor(private characterService: CharacterService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  private getCharacters(): void {
    this.characterService.getAll().subscribe(
      (response) => {
        this.characters = response.data.results as Character[];
        this.charactersEvent.emit(this.characters);
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }

  public searchCharacter(event) {
    const value = event.target.value;
    this.characterService.getByName(value).subscribe(
      (response) => {
        this.characters = response.data.results;
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }

  public openModalUpdateCharacter(character:Character): void {
    this.display = "block";
    this.character = character;
    this.characterEvent.emit(this.character);
    this.displayEvent.emit(this.display);
  }

}
