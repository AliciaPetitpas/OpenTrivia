import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IndexPage } from '../index/index.page';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IndexPage]
})
export class QuestionsComponent  implements OnInit {

  pseudo: string|null = localStorage.getItem("pseudo");
  questions: any[] = [
    {
      question: "De quelle couleur est le cheval blanc d'Henry IV ?",
      propositions: ['Blanc', 'Noir', 'Marron', 'Je ne sais pas'],
      reponse: 'Blanc',
    }
  ]

  nextQuestion: boolean = false;

  constructor() { }

  ngOnInit() {}

  verifyAnswer() {
    // TODO : vérification réponse
    this.nextQuestion = true;
  }
}
