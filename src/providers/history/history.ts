import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HistoryRecord } from '../../models/history-record';

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  private historyArray: Array<HistoryRecord> = [];

  constructor(private storage: Storage) {
    console.log('Hello HistoryProvider Provider');
    storage.get('history').then(
      (val) => {
        this.historyArray = JSON.parse(val);
      }
    );
  }

  addToHistory(from:string, to:string){
    let historyRecord = new HistoryRecord(from, to);
    
    this.historyArray.push(historyRecord);

    // store history array to persistent storage
    this.storage.set('history', JSON.stringify(this.historyArray));
  }

  getFromStorage():Array<HistoryRecord> {
    return this.historyArray;
  }

}
