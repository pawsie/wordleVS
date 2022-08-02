
export enum LetterStates { 
    BeforeCheckIsBlank,
    BeforeCheckNotBlank,
    WrongLetter,
    RightLetterWrongPlace,
    RightLetterRightPlace,
  };
  
export class Letter { 
  value: string = '[';
  state = LetterStates.BeforeCheckIsBlank;
    toString: any;
}

Letter.prototype.toString = function letterToString() {return `${this.value}`;};