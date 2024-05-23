import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  word: string = '';
  displayedWord: string[] = [];
  wrongGuesses: string[] = [];
  usedLetters: string[] = [];
  currentGuess: string = '';
  remainingGuesses: number = 0;
  gameStatus: string | null = null;
  wordLengthDisplay: string = '';
  showToaster: boolean = false;
  toasterMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.getWords().subscribe(words => {
      this.word = words[Math.floor(Math.random() * words.length)].toUpperCase();
      this.displayedWord = Array(this.word.length).fill('_');
      this.wrongGuesses = [];
      this.usedLetters = [];
      this.remainingGuesses = this.word.length + 3;
      this.gameStatus = null;
      this.updateWordLengthDisplay();
    });
  }

  makeGuess(): void {
    if (!this.currentGuess || !/^[a-zA-Z]$/.test(this.currentGuess)) {
      this.showToasterMessage('Invalid character');
      return;
    }

    const guess: string = this.currentGuess.toUpperCase();
    this.currentGuess = '';

    if (this.usedLetters.includes(guess) || this.wrongGuesses.includes(guess)) {
      return;
    }

    if (this.word.includes(guess)) {
      this.usedLetters.push(guess);
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === guess) {
          this.displayedWord[i] = guess;
        }
      }
    } else {
      this.wrongGuesses.push(guess);
      this.remainingGuesses--;
    }

    this.updateWordLengthDisplay();
    this.checkGameStatus();
  }

  updateWordLengthDisplay(): void {
    this.wordLengthDisplay = this.displayedWord.map(letter => letter === '_' ? '_' : letter).join(' ');
  }

  checkGameStatus(): void {
    if (this.displayedWord.join('') === this.word) {
      this.gameStatus = 'You won!';
    } else if (this.remainingGuesses <= 0) {
      this.gameStatus = `You lost! The word was: ${this.word}`;
    }
  }

  showToasterMessage(message: string): void {
    this.toasterMessage = message;
    this.showToaster = true;
    setTimeout(() => {
      this.showToaster = false;
    }, 5000);
  }

  getWords(): Observable<string[]> {
    return this.http.get<string[]>('assets/words.json');
  }
}
