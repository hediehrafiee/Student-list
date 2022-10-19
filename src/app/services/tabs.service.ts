import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private _tabSelected$ = new BehaviorSubject<number>(1);
  public tabSelectedUpdate$: Observable<number> =
    this._tabSelected$.asObservable();
  constructor(private http: HttpClient) {}

  public selectTab(id: number): void {
    this._tabSelected$.next(id);
  }

  getTabs(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map((data: any) => data));
  }
}
