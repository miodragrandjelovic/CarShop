import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  image: string="";

  @Input()
  price: number=2042;

  @Input()
  yearsOld:number=2014

  @Input()
  mark: string="Audi";

  @Input()
  model:string="A100";

  constructor() { }

  ngOnInit(): void {



  }

}
