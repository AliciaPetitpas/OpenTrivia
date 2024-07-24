import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class HomePage {
  pseudo: string = "";
  listLevels: any [] =  ['Easy', 'Medium', 'Hard'];
  difficulty: string = "Easy";
  amount: number = 2;
  keepInfos: boolean = false;
  errorMsg: string = "";
  isError: boolean = true;
  isAlertOpen: boolean = false;
  alertButtons: any[] = ['OK'];

  questions: any[] = [];
  question: string = "";
  replies: any;
  answer: string = "";

  isNextQuestion: boolean = false;
  isToastOpen: boolean = false;
  toastMsg: string = "";
  isReplay: boolean = false;

  isDisabledQuestion: boolean = false;
  isAnswered: boolean = false;
  points: number = 0;

  imgCat: string = "";

  constructor(private openTriviaSrv: OpenTriviaService, private apiSrv: APIService) {
    this.openTriviaSrv.getQuestions(this.amount, this.difficulty);
  }

  generateCat() {
    this.apiSrv.getCat().subscribe({
      next: (result: any) => {
        this.imgCat = this.apiSrv.urlCataas + '?' + result._id;
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  verifyInfos() {
    if (this.pseudo.length < 3) {
      this.errorMsg = "Veuillez rentrer un pseudo de 3 caractères minimum";
      this.isAlertOpen = true;
    } else {
      this.errorMsg = "";
      this.isError = false;
    }

    this.questions = this.openTriviaSrv.listQuestions;
    this.question = this.openTriviaSrv.getCurrentQuestion();
    this.replies = this.openTriviaSrv.getCurrentReplies();
    this.answer = this.openTriviaSrv.getCurrentAnswer();
}

  alertOpen(open: boolean) {
    this.isAlertOpen = open;
  }

  verifyAnswer(data: any) {
    if (data == this.openTriviaSrv.getCurrentAnswer()) {
      this.points++;
    }
    
    if (this.openTriviaSrv.index >= (this.openTriviaSrv.listQuestions.length - 1)) {
      this.isNextQuestion = false;
      this.isReplay = true;
    } else {
      this.isNextQuestion = true;
    }
    
    this.isAnswered = true;
    this.isDisabledQuestion = true;
    this.isToastOpen = true;
    this.toastMsg = "Votre score est de " + this.points + " point.s";
  }

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }

  nextQuestion() {
    this.openTriviaSrv.incrIndex();
    this.question = this.openTriviaSrv.getCurrentQuestion();
    this.replies = this.openTriviaSrv.getCurrentReplies();
    this.answer = this.openTriviaSrv.getCurrentAnswer();
    this.isNextQuestion = false;
    this.isDisabledQuestion = false;
    this.isAnswered = false;
  }

  replay() {
    this.isError = true;
    this.openTriviaSrv.reset();
    this.openTriviaSrv.getQuestions(this.amount, this.difficulty);
    this.question = this.openTriviaSrv.getCurrentQuestion();
    this.replies = this.openTriviaSrv.getCurrentReplies();
    this.answer = this.openTriviaSrv.getCurrentAnswer();
    this.isReplay = false;
    this.isDisabledQuestion = false;
    this.points = 0;
    this.isAnswered = false;
  }
}
