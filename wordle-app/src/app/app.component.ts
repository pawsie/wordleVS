import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { WordComponent } from './word/word.component';

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
  words = [
    Array<string>(this.letterCount).fill(this.blank),
    Array<string>(this.letterCount).fill(this.blank),
    Array<string>(this.letterCount).fill(this.blank),
    Array<string>(this.letterCount).fill(this.blank),
    Array<string>(this.letterCount).fill(this.blank),
    Array<string>(this.letterCount).fill(this.blank),
    ['A', 'D', 'E', 'I', 'Z']
  ];

  @ViewChildren('appwords') components!:QueryList<WordComponent>;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    this.key = event.key;

    if ((this.letterIndex >= 0 && this.letterIndex <= this.letterCount) && (event.key == "Backspace")){
    
      if (this.letterIndex > 0) this.letterIndex -= 1;
      this.words[this.wordIndex][this.letterIndex] = this.blank;
      
    }
    else if (this.letterIndex <= this.letterCount - 1){
    
      // if a-z or A-Z
      if (event.keyCode >= 65 && event.keyCode <= 90){
        this.words[this.wordIndex][this.letterIndex] = event.key.toUpperCase();
        this.letterIndex += 1;
      }
   
    }
    
    if (this.letterIndex == this.letterCount && event.key == "Enter"){
      this.checkWord();

      this.components.toArray()[this.wordIndex].shake();

      this.wordIndex += 1;
      this.letterIndex = 0;

   }

  }

  title = 'wordle-app';
  
  resetGame(){
    this.resetCount();
  }

  resetCount(){
    this.wordIndex = 0;
    this.letterIndex = 0;
  }
  
  resetWords(){
    this.words = [];
    for(let i = 0; i < 5; i++){
      this.words.concat(Array<string>(this.letterCount).fill(this.blank));
    }
    
  }

  checkWord(){
    this.currentWord = this.words[this.wordIndex].join('');
  }

}
