import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenTriviaService } from '../services/open-trivia.service';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class GamePage implements OnInit {
  pseudo: string = "";
  amount: number = 1;
  difficulty: string = "Easy";
  errorMsg: string = "";
  isError: boolean = true;

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

  constructor(private openTriviaSrv: OpenTriviaService, private route: ActivatedRoute, private router: Router) {
    if (this.openTriviaSrv.listQuestions.length > 1) {
      this.questions = this.openTriviaSrv.listQuestions;
      this.question = this.openTriviaSrv.getCurrentQuestion();
      this.replies = this.openTriviaSrv.getCurrentReplies();
      this.answer = this.openTriviaSrv.getCurrentAnswer();
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (response: any) => { 
        this.pseudo = response.get("pseudo");
        this.amount = response.get("amount");
        this.difficulty = response.get("difficulty");
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  nextQuestion() {
    this.openTriviaSrv.incrIndex();
    this.question = this.openTriviaSrv.getCurrentQuestion();
    this.replies = this.openTriviaSrv.getCurrentReplies();
    this.answer = this.openTriviaSrv.getCurrentAnswer();
    this.isNextQuestion = false;
    this.isDisabledQuestion = false;
    this.isAnswered = false;
  }

  viewPoints() {
    this.router.navigate(['/points', this.pseudo, this.amount, this.difficulty, this.points]);
  }

  replay() {
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

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
