import { Component } from '@angular/core';

@Component({
  selector: 'app-chi-siamo',
  imports: [],
  templateUrl: './chi-siamo.component.html',
  styleUrl: './chi-siamo.component.css'
})
export class ChiSiamoComponent {
  private alessiaAudio: HTMLAudioElement;
  private matteoAudio: HTMLAudioElement;
  private mirkoAudio: HTMLAudioElement;
  private pamelaAudio: HTMLAudioElement;
  private pietroAudio: HTMLAudioElement;
  private salvatoreAudio: HTMLAudioElement;
  private samueleAudio: HTMLAudioElement;
  private chatAudio: HTMLAudioElement;
  private riccardoAudiano: HTMLAudioElement;
  private skribblAudio: HTMLAudioElement;

  constructor() {
    this.alessiaAudio = new Audio();
    this.alessiaAudio.src = '/audio/skribblinoHappy.ogg';
    this.alessiaAudio.load();
    
    this.matteoAudio = new Audio();
    this.matteoAudio.src = '/audio/meowSexy.mp3';
    this.matteoAudio.load();
    
    this.mirkoAudio = new Audio();
    this.mirkoAudio.src = '/audio/iAmMalenia.mp3';
    this.mirkoAudio.load();
    
    this.pamelaAudio = new Audio();
    this.pamelaAudio.src = '/audio/SUN.mp3';
    this.pamelaAudio.load();
    
    this.pietroAudio = new Audio();
    this.pietroAudio.src = '/audio/presidente.ogg';
    this.pietroAudio.load();
    
    this.salvatoreAudio = new Audio();
    this.salvatoreAudio.src = '/audio/tiDevoDireCicciogamer.mp3';
    this.salvatoreAudio.load();
    
    this.samueleAudio = new Audio();
    this.samueleAudio.src = '/audio/avadaaKedavraa.mp3';
    this.samueleAudio.load();
    
    this.chatAudio = new Audio();
    this.chatAudio.src = '/audio/iAmAGod.mp3';
    this.chatAudio.load();
    
    this.riccardoAudiano = new Audio();
    this.riccardoAudiano.src = '/audio/pamAudio.ogg';
    this.riccardoAudiano.load();
    
    this.skribblAudio = new Audio();
    this.skribblAudio.src = '/audio/skribblinoSad.ogg';
    this.skribblAudio.load();
  }

  playAlessiaAudio(): void {
    this.alessiaAudio.play();
  }
  playMatteoAudio(): void {
    this.matteoAudio.play();
  }
  playMirkoAudio(): void {
    this.mirkoAudio.play();
  }
  playPamelaAudio(): void {
    this.pamelaAudio.play();
  }
  playPietroAudio(): void {
    this.pietroAudio.play();
  }
  playSalvatoreAudio(): void {
    this.salvatoreAudio.play();
  }
  playSamueleAudio(): void {
    this.samueleAudio.play();
  }
  playChatAudio(): void {
    this.chatAudio.play();
  }
  playRiccardoAudiano(): void {
    this.riccardoAudiano.play();
  }
  playSkribblAudio(): void {
    this.skribblAudio.play();
  }
}
