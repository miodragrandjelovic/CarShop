import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signUp():void{
    this.router.navigate(['register'])
  }

  login():void{
    this.router.navigate(['login'])
  }

}
