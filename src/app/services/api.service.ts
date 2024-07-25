import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private urlTrivia: string = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) { }

  getQuestions(amount: number, difficulty: string) {
    return this.http.get(this.urlTrivia + '?amount=' + amount + '&difficulty=' + difficulty.toLocaleLowerCase()).pipe(retry(2), catchError(error => of("Impossible de contacter l'API.")));
  }
}
