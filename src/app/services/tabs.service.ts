import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  constructor(private http: HttpClient) {}

  getTabs(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map((data: any) => data));
  }
}
