import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslationProvider } from '../../providers/translation/translation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userInput: string;
  private result: string;

  constructor(public navCtrl: NavController, private translationProvider: TranslationProvider) {

  }

  private btnTranslateClicked(input:string):void {
    console.log(input);
    this.userInput = input;

    //get translation
    this.translationProvider.getTranslationResponse(input).subscribe(
      (response:any) => {
        console.log(response);
      }
    );
  }

}
