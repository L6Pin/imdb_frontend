import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
tokenSubj = new BehaviorSubject<String>('');

  constructor() { }

}
