import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../app/services/quiz.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizData: Quiz | undefined;
  currentQuestionIndex: number = 0;
  showResults: boolean = false;
  resultArr: any = []

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizData();
  }

  loadQuizData(): void {
    this.quizService.getQuizData().subscribe(data => {
      this.quizData = data;
    });
  }

  onNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === this.quizData?.questions.length) {
      this.showResults = true;
    }
  }

  getResult(event: any): void {
    this.resultArr = event
    console.log(this.resultArr)
  }

  optionExits(value: any, index: any) {
    if (this.resultArr[index]?.selectedAnswer) {
      let arr = Array.from(this.resultArr[index].selectedAnswer)
      return arr.includes(JSON.stringify(value))
    } else {
      return false
    }
  }

  isCorrect(answer: any, optionId: any) {
    return Array.from(answer).includes(optionId)
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.showResults = false;
  }
}
