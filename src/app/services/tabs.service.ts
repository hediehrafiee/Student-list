import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { Components } from '../const/components';
import { Menu, TabList } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private _tabsId: number = 0;
  private _personalComponents: any = Components;

  private _simpleTabs: any = [];
  private _tabs$ = new BehaviorSubject<any[]>([]);
  public tabs$ = this._tabs$.asObservable();

  private _tabSelectedId$ = new BehaviorSubject<number>(-1);
  public tabSelectedId$: Observable<number> =
    this._tabSelectedId$.asObservable();

  private _tabSelected$ = new BehaviorSubject<TabList | any>(null);
  public get tabSelected$(): Observable<TabList> {
    return this._tabSelected$.asObservable();
  }
  public get menu$(): Observable<Menu[]> {
    return this._tabs$
      .asObservable()
      .pipe(map((tabs) => this.convertToMenu(tabs)));
  }

  constructor(private http: HttpClient) {
    this.getTabs()
      .pipe(
        map(
          (data: any) =>
            (data.items[0].items[0].items as Array<any>).find(
              (item: any) => item.Type === 'TabbedGroup'
            ).items
        ),
        map((taggedGroup) => this.convertToList(taggedGroup, 0)),

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
    this._tabSelected$.next(
      this._simpleTabs.find((st: TabList) => st.id === id)
    );
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
