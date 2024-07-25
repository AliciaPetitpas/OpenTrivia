import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { APIService } from '../services/api.service';
import { Answer } from '../models/answer';

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
  replies: any[] = [];
  answer: string = "";
  index: number = 0;

  isNextQuestion: boolean = false;
  isToastOpen: boolean = false;
  toastMsg: string = "";
  isReplay: boolean = false;

  isDisabledQuestion: boolean = false;
  isAnswered: boolean = false;
  points: number = 0;

  constructor(private apiSrv: APIService, private route: ActivatedRoute, private router: Router) {

  }
  
  ngOnInit() {
    this.pseudo = this.route.snapshot.params["pseudo"];
    this.difficulty = this.route.snapshot.params["difficulty"];
    this.amount = this.route.snapshot.params["amount"];

    this.generateQuiz();
    this.isReplay = false;
    this.isDisabledQuestion = false;
    this.points = 0;
    this.isAnswered = false;
  }

  generateQuiz() {
    this.apiSrv.getQuestions(this.amount, this.difficulty).subscribe({
      next: (response: any) => {
        if (response.results) {
          // On parcourt ces questions pour créer la liste de questions du jeu
          response.results.forEach((question: any) => {

          // On crée un tableau de réponses vide
          let answers: Answer[] = [];

          // On parcourt la liste de mauvaises réponses retournée par l'API pour ajouter au tableau des objets "Answer"
          question.incorrect_answers.forEach((element: any) => {
            answers.push({ label: element, isCorrect: false });
          });
          // On ajoute la bonne réponse
          answers.push({ label: question.correct_answer, isCorrect: true });
          
          // Ici on fait un mélange simple du tableau, dans l'absolu on aurait pu aussi utiliser l'algorithme de Fisher-Yates
          answers.sort((a, b) => 0.5 - Math.random());

          // On crée un objet "Question"
          this.questions.push({
            question: question.question,
            listAnswers: answers,
            category: question.category
          });
        });
        this.getCurrentQuestion();
        } else {
          this.toastMsg = 'Erreur : impossible de contacter l\'API. Veuillez vérifier votre connexion internet !';
          this.isToastOpen = true;
        }
      },
      error: (err) => {
        this.toastMsg = err;
        this.isToastOpen = true;
      }
    });
  }

  getCurrentQuestion() {
    this.question = this.questions[this.index].question;
    this.replies = this.questions[this.index].listAnswers;
    
    this.questions[this.index].listAnswers.forEach((a:any) => {
      if (a.isCorrect == true) {
        this.answer = a.label;
      }
    })
  }

  nextQuestion() {
    this.isNextQuestion = false;
    this.isDisabledQuestion = false;
    this.isAnswered = false;

    if (this.index < this.questions.length - 1)
      this.index++;
    this.getCurrentQuestion();
  }

  async verifyAnswer(response: Answer) {
    this.isNextQuestion = true;
    this.isAnswered = true;
    this.isDisabledQuestion = true;
    
    
    if (response.isCorrect) {
      this.points++;
      this.isToastOpen = true;
      this.toastMsg = 'Votre score est de ' + this.points;
      await Preferences.remove({ key:'points'});
      await Preferences.set(
        {
        key: 'points',
        value: this.points.toString(),
        }
      )
    }

    if (this.index >= (this.questions.length - 1)) {
      this.isNextQuestion = false;
      this.isReplay = true;
    } else {
      this.isNextQuestion = true;
    }
  }
  
  replay() {
    this.generateQuiz();
    this.getCurrentQuestion();
    this.isReplay = false;
    this.isDisabledQuestion = false;
    this.points = 0;
    this.isAnswered = false;
  }

  viewPoints() {
    this.router.navigate(['/points', this.pseudo, this.amount, this.points]);
  }

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
