import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private urlTrivia: string = "https://opentdb.com/api.php";
  urlCataas: string = "https://cataas.com/cat";

  constructor(private http: HttpClient) { }

  getQuestions(amount: number, difficulty: string) {
    return this.http.get(this.urlTrivia + '?amount=' + amount + '&difficulty=' + difficulty.toLocaleLowerCase());
  }

  getCat() {
    return this.http.get(this.urlCataas + '?json=true');
  }
}
