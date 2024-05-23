// src/app/app.config.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LetterHighlightDirective } from './letter-highlight.directive';
import { GetPropertyPipe } from './get-property.pipe';
import { CallMethodPipe } from './call-method.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LetterHighlightDirective,
    GetPropertyPipe,
    CallMethodPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: GameComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
