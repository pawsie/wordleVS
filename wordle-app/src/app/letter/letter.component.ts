import { Component, Input, OnInit } from '@angular/core';
import { Letter, LetterStates } from './letterModel';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})

export class LetterComponent implements OnInit {

  @Input() letter !: Letter;

  constructor() { }

  ngOnInit(): void {    
  }

  getTextColor(){
    if (this.letter.state == LetterStates.BeforeCheckNotBlank)
      return 'black';
    else
      return 'white';    
  }

  getBackgroundColor(){
    var color = 'white';
    switch (this.letter.state){
      case LetterStates.RightLetterRightPlace:
        color = '#6aaa64';
        break;
      case LetterStates.RightLetterWrongPlace:
        color = '#c9b458';
        break;
      case LetterStates.WrongLetter:
        color =  'gray';   
        break;   
    }
    return color;
  }

}
