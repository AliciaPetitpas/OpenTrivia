import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {
  listQuestions: any[] = [];
  index: number = 0;
  replies: any[] = [];

  constructor(private apiSrv: APIService) { }

  getQuestions(amount: number, difficulty: string): Observable<any[]>|void {
    this.apiSrv.getQuestions(amount, difficulty).subscribe({
      next: (result: any) => {
        // console.log(result);
        if (result.results) {
          this.listQuestions = result.results;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getRandomNumberPromise(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.index > this.listQuestions.length)
        reject('No');
      resolve(this.index);
    });
  }

  getCurrentQuestion() {
    return this.listQuestions[this.index].question;
  }

  getCurrentReplies() {
    this.replies = [];

    this.listQuestions[this.index].incorrect_answers.forEach((element: String) => {
      this.replies.push(element);
    });
    this.replies.push(this.listQuestions[this.index].correct_answer);

    return this.shuffle(this.replies);
  }

  getCurrentAnswer() {
    return this.listQuestions[this.index].correct_answer;
  }

  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }

  incrIndex() {
    this.index++;
  }

  reset() {
    this.index = 0;
  }
}
