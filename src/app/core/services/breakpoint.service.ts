import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public isLargeHandset: Observable<boolean>;
  public isTablet: Observable<boolean>;
  public isWeb: Observable<boolean>;
  public isSmallTable: Observable<boolean>;
  public isUpperMediumHandset: Observable<boolean>;
  public islowerMediumHandset: Observable<boolean>;

  public breakpointName: Observable<string>;
  public isMobile: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isWeb = this.breakpointObserver.observe('(min-width: 1025px)').pipe(map(result => result.matches));

    this.isTablet = this.breakpointObserver.observe('(max-width: 1024px)').pipe(map(result => result.matches));
    this.isSmallTable = this.breakpointObserver.observe('(max-width: 850px)').pipe(map(result => result.matches));
    this.isLargeHandset = this.breakpointObserver.observe('(max-width: 600px)').pipe(map(result => result.matches));
    this.isUpperMediumHandset = this.breakpointObserver
      .observe('(max-width: 480px)')
      .pipe(map(result => result.matches));
    this.islowerMediumHandset = this.breakpointObserver
      .observe('(max-width: 400px)')
      .pipe(map(result => result.matches));

    this.isSmallTable.subscribe(value => {
      this.isMobile = value;
    });
  }
}
