import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Letter, LetterStates } from './letterModel';

function getFlipAnimation(letterState: LetterStates){

  var colors = getColors(letterState);

  return [
    animate('0.5s', 
      keyframes([
        style({transform: 'scaleY(60%)', offset: 0.5}),
        style({transform: 'scaleY(30%)', offset: 0.6}),
        style({transform: 'scaleY(0%)', color: colors.color, background: colors['background-color'], borderColor: colors['border-color'], offset: 0.7}),
        style({transform: 'scaleY(30%)', color: colors.color, background: colors['background-color'], borderColor: colors['border-color'], offset: 0.8}),
        style({transform: 'scaleY(60%)', color: colors.color, background: colors['background-color'], borderColor: colors['border-color'], offset: 0.9}),
        style({transform: 'scaleY(100%)', color: colors.color, background: colors['background-color'], borderColor: colors['border-color'], offset: 1}),
      ])
    ) 
  ];
}

function getColors(letterState: LetterStates){
  
    var textColor = 'white';
    var backgroundColor = 'white';
    var borderColor = 'gray';

    switch (letterState){
      case LetterStates.BeforeCheckIsBlank:
        backgroundColor = 'white';
        borderColor = 'gray';
        break;
      case LetterStates.BeforeCheckNotBlank:
        textColor = 'black';
        backgroundColor = 'white';
        borderColor = 'gray';
        break;
      case LetterStates.RightLetterRightPlace:
        backgroundColor = '#6aaa64';
        borderColor = '#6aaa64';
        break;
      case LetterStates.RightLetterWrongPlace:
        backgroundColor = '#c9b458';
        borderColor = '#c9b458';
        break;
      case LetterStates.WrongLetter:
        backgroundColor = 'gray';
        borderColor = 'gray';
        break;  
    }
    
    return {'color': textColor, 'background-color': backgroundColor, 'border-color': borderColor};
  
}

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: [
    // trigger('shake', [transition('true <=> false', shakeAnimation)]),
    trigger('flip', [
        state(`${LetterStates.BeforeCheckIsBlank}`, style( getColors(LetterStates.BeforeCheckIsBlank))),
        state(`${LetterStates.BeforeCheckNotBlank}`, style( getColors(LetterStates.BeforeCheckNotBlank))),
        state(`${LetterStates.RightLetterRightPlace}`, style( getColors(LetterStates.RightLetterRightPlace))),
        state(`${LetterStates.RightLetterWrongPlace}`, style( getColors(LetterStates.RightLetterWrongPlace))),
        state(`${LetterStates.WrongLetter}`, style( getColors(LetterStates.WrongLetter))),

        transition(`${LetterStates.BeforeCheckNotBlank} => ${LetterStates.BeforeCheckIsBlank}`, getFlipAnimation(LetterStates.BeforeCheckIsBlank)),
        // transition(`${LetterStates.BeforeCheckNotBlank} => ${LetterStates.BeforeCheckNotBlank}`, getFlipAnimation(LetterStates.BeforeCheckNotBlank)),
        transition(`${LetterStates.BeforeCheckNotBlank} => ${LetterStates.RightLetterRightPlace}`, getFlipAnimation(LetterStates.RightLetterRightPlace)),
        transition(`${LetterStates.BeforeCheckNotBlank} => ${LetterStates.RightLetterWrongPlace}`, getFlipAnimation(LetterStates.RightLetterWrongPlace)),
        transition(`${LetterStates.BeforeCheckNotBlank} => ${LetterStates.WrongLetter}`, getFlipAnimation(LetterStates.WrongLetter)),        
      ]
    )
  ]
})

export class LetterComponent implements OnInit {

  @Input() letter !: Letter;

  constructor() { }

  ngOnInit(): void {    
  }

  flipTrigger = true;
  flip() {
    this.flipTrigger = !this.flipTrigger;
  }
  
  getStyle(){
    var colors = getColors(this.letter.state);
    return {'color': colors.color, 'background-color': colors['background-color'], 'border-color': colors['border-color']};
  }
}