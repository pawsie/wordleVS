import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [
    trigger('shake', [     
     
      transition('true <=> false', [
        animate('0.5s', keyframes([
          style({transform: 'translateX(-10px)', offset: 0}),
          style({transform: 'translateX(20px)', offset: 0.2}),
          style({transform: 'translateX(-20px)', offset: 0.4}),
          style({transform: 'translateX(20px)', offset: 0.6}),
          style({transform: 'translateX(-20px)', offset: 0.8}),
          style({transform: 'translateX(10px)', offset: 1}),
        ]))
      ]),
    ]),
  
  ]
})
export class WordComponent implements OnInit {

  @Input() letters!: string[];

  ngOnInit(): void {    
  }

  shakeTrigger = true;

  shake() {
    this.shakeTrigger = !this.shakeTrigger;
  }

}
