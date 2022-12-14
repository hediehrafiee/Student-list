import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap, combineLatest } from 'rxjs';
import { Components } from '../const/components';
import { Menu, TabList } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private _tabsId: number = 0;
  private _personalComponents: any = Components;
  private _tabs$ = new BehaviorSubject<any[]>([]);
  private _tabSelectedId$ = new BehaviorSubject<number>(-1);
  public get tabSelectedId$(): Observable<number> {
    return this._tabSelectedId$.asObservable();
  }
  public get tabSelected$(): Observable<TabList> {
    return combineLatest([this._tabs$, this._tabSelectedId$]).pipe(
      map(([tabs, id]) => {
        return tabs.find((tab: any) => tab.id === id);
      })
    );
  }
  public get menu$(): Observable<Menu[]> {
    return this._tabs$
      .asObservable()
      .pipe(map((tabs) => this.convertToMenu(tabs)));
  }

  constructor(private http: HttpClient) {
    this.getTabs()
      .pipe(
        map((data) => this.convertToList(data.items, 0)),
        map((tabs: TabList[]) => [
          {
            title: 'اصلی',
            id: -1,
            parentID: 0,
            items: [this._personalComponents[0]],
          },
          ...tabs,
        ])
      )
      .subscribe((tabs) => {
        this._tabs$.next(tabs);
      });
  }

  public selectTab(id: number): void {
    this._tabSelectedId$.next(id);
  }

  private getTabs(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map((data: any) => data));
  }
  private convertToMenu(items: any, id = 0) {
    return items
      .filter((item: any) => item.parentID === id)
      .map((item: any) => ({
        ...item,
        children: this.convertToMenu(items, item.id),
      }));
  }
  private convertToList(
    items: any,
    parent = 0,
    destination: any[] = []
  ): TabList[] {
    for (let item of items) {
      if (
        item.xtype === 'Ly.LayoutTabPage' &&
        item.Title &&
        item.TextVisible?.toString() !== 'false'
      ) {
        this._tabsId++;

        destination = [
          ...destination,
          {
            title: item.Title,
            id: this._tabsId,
            parentID: parent,
            items: [this._personalComponents[this._tabsId]],
          },
        ];
      }

      if (item.items)
        destination = [
          ...destination,
          ...this.convertToList(
            item.items,
            item.Type === 'LayoutGroup' && item.Title ? this._tabsId : parent
          ),
        ];
    }
    return destination;
  }
}
