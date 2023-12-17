import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastActive: Toast | null = null;
  private toastActive$: Subject<Toast | null> = new Subject();

  constructor() {}

  error(title: string, text: string) {
    this.setToast({ type: 'error', title, text });
    console.log(text)
    setTimeout(() => {
      this.setToast(null);
    }, 5000);
  }

  info(title: string, text: string) {
    this.setToast({ type: 'info', title, text });
    setTimeout(() => {
      this.setToast(null);
    }, 5000);
  }

  warning(title: string, text: string) {
    this.setToast({ type: 'warning', title, text });
    setTimeout(() => {
      this.setToast(null);
    }, 5000);
  }

  success(title: string, text: string) {
    this.setToast({ type: 'success', title, text });
    console.log(text)
    setTimeout(() => {
      this.setToast(null);
    }, 5000);
  }

  setToast(u: Toast | null): void {
    this.toastActive = u;
    this.toastActive$.next(this.toastActive);
  }

  getToast(): Observable<Toast | null> {
    return this.toastActive$.asObservable();
  }
}

interface Toast {
  type: 'error' | 'info' | 'warning' | 'success';
  title: string;
  text: string;
}
