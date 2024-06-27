import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `../../assets/mock-quiz-data.json`;

  constructor(private http: HttpClient) { }

  getQuizData(): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiUrl);
  }
}
