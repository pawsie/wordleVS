import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LetterComponent } from './letter/letter.component';
import { WordComponent } from './word/word.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    WordComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
