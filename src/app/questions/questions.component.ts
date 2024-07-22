import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class QuestionsComponent  implements OnInit {
  pseudo: string|null = localStorage.getItem("pseudo");
  questions: any[] = [
    {
      question: "De quelle couleur est le cheval blanc d'Henry IV ?",
      propositions: ['Blanc', 'Noir', 'Marron', 'Je ne sais pas'],
      reponse: 'Blanc',
    }
  ];
  nextQuestion: boolean = false;
  isToastOpen: boolean = false;
  toastMsg: string = "";

  constructor() { }

  ngOnInit() {}

  verifyAnswer(data: any) {
    console.log(data);
    // TODO : vérification réponse
    this.nextQuestion = true;
    this.isToastOpen = true;
    this.toastMsg = "Votre réponse est: ";
  }

  toastOpen(open: boolean) {
    this.isToastOpen = open;
  }
}
