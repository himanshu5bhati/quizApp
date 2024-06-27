import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Question, Quiz } from '../../models/quiz.model';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question | any;
  @Input() questionArr: Quiz | any;
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() result = new EventEmitter<any>();
  selectedAnswer: any = [];
  duration: any;
  currentQuestion: Question | any;
  countDown: any;
  answers: any[] = [];

  constructor() { }

  ngOnInit() {
    this.timer(this.question.timeLimit)
  }

  timer(timeLimit: any) {
    clearInterval(this.duration)
    this.countDown = timeLimit
    this.currentQuestion = this.question
    this.duration = setInterval(() => {
      this.countDown = this.countDown - 1;
      if (this.countDown === 0) {
        clearInterval(this.duration)
        this.nextQuestion.emit()
        setTimeout(() => {
          if (this.question.id !== this.currentQuestion.id)
            this.timer(this.question.timeLimit)
        });
      }
    }, 1000)
  }

  onSelectAnswer(selectedOption: any, questionId: string) {
    let answer: any = this.answers.find(ans => ans.questionId === questionId);

    if (!answer) {
      answer = { questionId: questionId, selectedAnswer: [] };
      this.answers.push(answer);
    }

    if (selectedOption.type === 'checkbox') {
      const selectedValue = selectedOption.value;
      if (selectedOption.checked) {
        answer.selectedAnswer.push(selectedValue);
      } else {
        const index = answer.selectedAnswer.indexOf(selectedValue);
        if (index !== -1) {
          answer.selectedAnswer.splice(index, 1);
        }
      }
    } else {
      answer.selectedAnswer = selectedOption.value;
    }
  }

  onNext(questionId: any): void {
    let answer: any = this.answers.find(ans => ans.questionId === questionId);

    if (!answer) {
      answer = { questionId: questionId, selectedAnswer: [] };
      this.answers.push(answer);
    }
    this.nextQuestion.emit();
    setTimeout(() => {
      clearInterval(this.duration)
      if (this.question.id !== this.currentQuestion.id)
        this.timer(this.question.timeLimit)
    })
  }

  onSubmitAnswer(questionId: any): any {
    let answer: any = this.answers.find(ans => ans.questionId === questionId);

    if (!answer) {
      answer = { questionId: questionId, selectedAnswer: [] };
      this.answers.push(answer);
    }
    this.nextQuestion.emit();
    this.result.emit(this.answers);
  }
}
