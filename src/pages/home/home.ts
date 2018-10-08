import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userInput: string;
  private result: string;

  constructor(public navCtrl: NavController) {

  }

  private btnTranslateClicked(input:string):void {
    console.log(input);
    this.userInput = input;
  }

}
