import { VectorMath } from './../../modules/physics-engine/core/vector-math';
import { Observable, BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Point } from '../models/point';

@Injectable()
export class MouseMoveService {

  public mousePosition: Observable<Point>;
  public mouseButtonDown: Observable<boolean>;
  public mouseButtonUp: Observable<boolean>;
  public isMousePressed: boolean = false;

  public touchDown: Observable<boolean>;
  public touchUp: Observable<boolean>;
  public touchMove: Subscription;

  public isPressed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public touchPosition: Point = {
    x: 0,
    y: 0,
  };
  public lastPosition: Point = {
    x: 0,
    y: 0,
  };
  public scale = 1;
  public correction = new Point(0, 0);
  public correctionY = 0;
  public correctionX = 0;
  constructor() {
    this.mousePosition = fromEvent(document, 'mousemove').pipe(map(this.handleMouseMove),

      tap((point: Point) => {
        this.lastPosition = this.correctionPoint(point);
      })
    );

    this.mouseButtonDown = fromEvent(document, 'mousedown').pipe(
      map(() => {
        return true;
      }),
      tap((value) => {
        this.isPressed$.next(value);
        this.touchPosition = this.lastPosition;
      })
    );
    this.mouseButtonUp = fromEvent(document, 'mouseup').pipe(
      map(() => {
        return false;
      }),
      tap((value) => {
        this.isPressed$.next(value);
      })
    );

    this.touchDown = fromEvent(document, 'touchstart').pipe(
      map(() => {
        return true;
      }),
      tap((value) => {
        this.isPressed$.next(value);
      })
    );

    this.touchUp = fromEvent(document, 'touchend').pipe(
      map(() => {
        return false;
      }),
      tap((value) => {
        this.lastPosition = new Point(0, 0);
        this.isPressed$.next(value);
      })
    );
    this.touchMove = fromEvent(document, 'touchmove')
      .pipe(
        tap((value) => {
          const touches = (value as TouchEvent).changedTouches[0];
          const { pageX, pageY } = touches;
          const point = new Point(pageX, pageY);
          this.lastPosition = this.correctionPoint(point);
        })
      )
      .subscribe();
    this.touchUp.subscribe();
    this.touchDown.subscribe();
    this.mouseButtonDown.subscribe();
    this.mouseButtonUp.subscribe();
  }

  private correctionPoint(point: Point): Point {
    const fullCorrection = VectorMath.add(this.correction, new Point(this.correctionX, this.correctionY));
    const invCorrection = VectorMath.product(fullCorrection, -1);
    const newPoint = VectorMath.add(invCorrection, point);

    return VectorMath.product(newPoint, 1 / this.scale);
  }

  private handleMouseMove(mouseEvent: any): Point {
    const event = mouseEvent || new MouseEvent('mousemove'); // IE-ism
    let { pageX, pageY } = event;
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      const doc = document.documentElement;
      const body = document.body;

      pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
      pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }
    return new Point(pageX, pageY);
  }
}
