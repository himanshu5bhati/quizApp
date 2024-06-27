import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { FormatTimePipe } from './pipes/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
