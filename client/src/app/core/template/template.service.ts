import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface TemplateState {
  drawer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateState = new BehaviorSubject<TemplateState>({
    drawer: false,
  });

  state$ = this.templateState.asObservable();
  drawer$ = this.templateState.asObservable().pipe(
    map(state => state.drawer)
  );

  get state() {
    return this.templateState.value;
  }

  constructor() { }

  openDrawer() {
    this.templateState.next({...this.state, drawer: true});
  }

  closeDrawer() {
    this.templateState.next({...this.state, drawer: false});
  }

  toggleDrawer() {
    this.state.drawer
      ? this.closeDrawer()
      : this.openDrawer();
  }
}
