import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslationProvider } from '../../providers/translation/translation';
import { HistoryProvider } from '../../providers/history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userInput: string;
  private result: string;

  constructor(
    public navCtrl: NavController,
    private translationProvider: TranslationProvider,
    private historyProvider: HistoryProvider
  ) {

  }

  public btnTranslateClicked(input:string):void {
    console.log(input);
    this.userInput = input;

    //get translation
    this.translationProvider.getTranslationResponse(input).subscribe(
      (response:any) => {
        console.log(response);
        this.result = response.responseData.translatedText;
        
        //store translation history
        this.historyProvider.addToHistory(this.userInput, this.result);
      }
    );
  }

}
