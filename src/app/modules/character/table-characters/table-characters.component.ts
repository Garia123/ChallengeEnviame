import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { ToastrService } from 'ngx-toastr';
import { FormCharacterComponent } from '../form-character/form-character.component';

@Component({
  selector: 'app-table-characters',
  templateUrl: './table-characters.component.html',
  styleUrls: ['./table-characters.component.scss'],
})
export class TableCharactersComponent implements OnInit {
  public display: string;
  characters: Array<Character> = new Array<Character>();
  @ViewChild('formCharacter') formCharacter: FormCharacterComponent;

  constructor(private characterService: CharacterService, private toastr: ToastrService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  private getCharacters(): void {
    this.characterService.getAllCharacters().subscribe(
      (response) => {
        this.characters = response.data.results as Character[];
        this.formCharacter.characters = this.characters;
      },
      (error) => {
        this.toastr.error('Error!', 'An error occurred and the list of characters could not be obtained.');
      }
    );
  }

  public onGetCharacters(characters: Array<Character>): void {
    this.characters = characters;
  }

  public onEditItem(index: number): void {
    this.formCharacter.imageUrl = this.characters[index].thumbnail.path + '.' + this.characters[index].thumbnail.extension;
    this.formCharacter.character = this.characters[index];
    this.formCharacter.indexCharacter = index;
    this.formCharacter.editMode = true;
    this.formCharacter.thumbnail.path = this.characters[index].thumbnail.path;
    this.formCharacter.thumbnail.extension = this.characters[index].thumbnail.extension;
    this.formCharacter.editCharacter();
  }

  public searchCharacter(event): void {
    const value = event.target.value;
    this.characterService.getByName(value).subscribe(
      (response) => {
        this.characters = response.data.results;
        this.formCharacter.characters = this.characters;
      },
      (error) => {
        this.getCharacters();
      }
    );
  }
}
