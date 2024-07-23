import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {
  listQuestions: any[] = [
    {
      category: "Entertainment: Japanese Anime & Manga",
      type: "multiple",
      difficulty: "easy",
      question: "In 'Fairy Tail', what is the nickname of Natsu Dragneel?",
      correct_answer: "The Salamander",
      incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
    },
    {
      category: "Entertainment: Video Games",
      type: "boolean",
      difficulty: "medium",
      question: "'Return to Castle Wolfenstein' was the only game of the Wolfenstein series where you don't play as William 'B.J.' Blazkowicz",
      correct_answer: "False",
      incorrect_answers: ["True"]
    }
  ];
  index: number = 0;
  replies: any[] = [];

  constructor() { }

  getQuestions(difficulty: String): Promise<any[]> {
    return new Promise((resolve) => {
      resolve(this.listQuestions);
    })
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
