import { animate, animateChild, group, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Word } from './wordModel';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  animations: [
    trigger('shake', [     
     
      // transition('true <=> false', [
      //   animate('0.5s', keyframes([
      //     style({transform: 'translateX(-10px)', offset: 0}),
      //     style({transform: 'translateX(20px)', offset: 0.2}),
      //     style({transform: 'translateX(-20px)', offset: 0.4}),
      //     style({transform: 'translateX(20px)', offset: 0.6}),
      //     style({transform: 'translateX(-20px)', offset: 0.8}),
      //     style({transform: 'translateX(10px)', offset: 1}),
      //   ]))
      // ]),
    ]),

    trigger('letterFlip', [        
     
      transition('true <=> false', [        
          // query(":leave", 
            // [stagger(400,
              animate('0.5s', 
                keyframes([
                  style({transform: 'scaleY(60%)', offset: 0}),
                  style({transform: 'scaleY(30%)', offset: 0.2}),
                  style({transform: 'scaleY(0%)', offset: 0.4}),
                  style({transform: 'scaleY(30%)', offset: 0.6}),
                  style({transform: 'scaleY(60%)', offset: 0.8}),
                  style({transform: 'scaleY(100%)', offset: 1}),
                ])
              )
            // )],
            // {optional: true}
          // ),        
      ]),

    ]),
  ]
})
export class WordComponent implements OnInit {

  @Input() word !: Word;

  ngOnInit(): void {    
  }

  shakeTrigger = true;
  flipTrigger = true;

  shake() {
    this.shakeTrigger = !this.shakeTrigger;
    this.flipTrigger = !this.flipTrigger;
  }

}
