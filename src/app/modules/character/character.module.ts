import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCharactersComponent } from './table-characters/table-characters.component';
import { FormCharacterComponent } from './form-character/form-character.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TableCharactersComponent, FormCharacterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [TableCharactersComponent, FormCharacterComponent]
})
export class CharacterModule { }
