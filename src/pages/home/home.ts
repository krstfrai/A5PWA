import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslationProvider } from '../../providers/translation/translation';
import { HistoryProvider } from '../../providers/history/history';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@ionic-native/speech-recognition';

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
    private historyProvider: HistoryProvider,
    private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition
  ) {
    
  }

  public btnMicClicked():void {

    //Check permissions for microphone
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
       console.log('Recognition: ', hasPermission);
      if(!hasPermission) {
        //request permission
        this.speechRecognition.requestPermission()
        .then(
          () => {
            console.log('Granted');
          },
            //speech recognition
            // Start the recognition process
          () => console.log('Denied')
        )
      }
      else {
        let opt:SpeechRecognitionListeningOptions = {matches: 6};
        this.speechRecognition.startListening(opt)
            .subscribe(
              (matches: Array<string>) => console.log(matches),
              (onerror) => console.log('error:', onerror)
            )
          }
  });
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

        //translation result to speech
        this.tts.speak(this.result)
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));

        //text to speech 
        this.tts.speak(this.userInput);
      }
    );
  }

}
