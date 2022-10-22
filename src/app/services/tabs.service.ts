import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private _tabSelected$ = new BehaviorSubject<number>(0);
  public tabSelectedUpdate$: Observable<number> =
    this._tabSelected$.asObservable();

  private _tabs$ = new BehaviorSubject<any[]>([]);
  public tabs$ = this._tabs$.asObservable();

  private tabsId: number = 0;
  constructor(private http: HttpClient) {
    const tabs = this.getTabs().subscribe((data: any): void => {
      const findTaggedGroup = (data.items[0].items[0].items as Array<any>).find(
        (item: any) => item.Type === 'TabbedGroup'
      );

      this.convertMenu(findTaggedGroup.items);
      this._tabs$.next(this.convertTabs(this._tabs$.value));
      this._tabs$.value.unshift({ title: 'اصلی', id: 0, children: [] });
      this._tabs$.next(this._tabs$.value);
    });
  }

  public selectTab(id: number): void {
    this._tabSelected$.next(id);
  }

  getTabs(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map((data: any) => data));
  }

  private convertTabs(items: any, id = 0) {
    return items
      .filter((item: any) => item.parentID === id)
      .map((item: any) => ({
        ...item,
        children: this.convertTabs(items, item.id),
      }));
  }

  private convertMenu(items: any, parent = 0) {
    for (let item of items) {
      if (
        item.xtype === 'Ly.LayoutTabPage' &&
        item.Title &&
        item.TextVisible?.toString() !== 'false'
      ) {
        this.tabsId++;

        // this._tabs$.push({
        //   title: item.Title,

        //   id: this.tabsId,

        //   parentID: parent,
        // });
        this._tabs$.next(
          this._tabs$.value.concat({
            title: item.Title,

            id: this.tabsId,

            parentID: parent,
          })
        );
      }

      if (item.items)
        this.convertMenu(
          item.items,
          item.Type === 'LayoutGroup' && item.Title ? this.tabsId : parent
        );
    }
  }
}
