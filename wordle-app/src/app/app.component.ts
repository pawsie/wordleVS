import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { LetterStates } from './letter/letterModel';
import { WordComponent } from './word/word.component';
import { Word } from './word/wordModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent {

  key: any;
  wordIndex = 0;
  letterIndex = 0;
  wordCount = 6;
  letterCount = 5;
  currentWord = '';
  blank='[';
  words: Word[] = new Array(this.wordCount);

  constructor(){
    this.resetWords();
  }

  @ViewChildren('appword') wordComponents !: QueryList<WordComponent>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    this.key = event.key;

    if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (event.key == "Backspace")){
    
      if (this.letterIndex > 0) this.letterIndex -= 1;

      this.words[this.wordIndex].letters[this.letterIndex].value = this.blank;
      this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.BeforeCheckIsBlank;
      
    }
    else if (this.letterIndex <= this.letterCount - 1){
    
      // if a-z or A-Z
      if (event.keyCode >= 65 && event.keyCode <= 90){
        this.words[this.wordIndex].letters[this.letterIndex].value = event.key.toUpperCase();
        this.words[this.wordIndex].letters[this.letterIndex].state = LetterStates.BeforeCheckNotBlank;

        this.letterIndex += 1;        
      }
   
    }
    
    if ((this.letterIndex == this.letterCount) && 
      (this.wordIndex < this.wordCount) &&
      (event.key == "Enter")){
      this.checkWord();

      // this.wordComponents.toArray()[this.wordIndex].shake();
      this.wordComponents.toArray()[this.wordIndex].flip();

      this.words[this.wordIndex].letters[0].state = LetterStates.BeforeCheckIsBlank;
      this.words[this.wordIndex].letters[1].state = LetterStates.BeforeCheckNotBlank;
      this.words[this.wordIndex].letters[2].state = LetterStates.RightLetterRightPlace;
      this.words[this.wordIndex].letters[3].state = LetterStates.RightLetterWrongPlace;
      this.words[this.wordIndex].letters[4].state = LetterStates.WrongLetter;

      this.wordIndex += 1;
      this.letterIndex = 0;

   }

  }

  title = 'wordle-app';
  
  resetGame(){
    this.resetIndices();
    this.resetWords();
  }

  resetIndices(){
    this.wordIndex = 0;
    this.letterIndex = 0;
  }
  
  resetWords(){
    for (var i = 0; i < this.wordCount; i++){
      this.words[i] = new Word();
    }
  }

  checkWord(){
    this.currentWord = this.words[this.wordIndex].letters.join('');
  }

}
