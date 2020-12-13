import { Point } from './../../../core/models/point';
import { Vector } from './vector.model';
import { BoundRectangle, Size } from './size.model';
import { Constraint } from './constraint';
import { Transformations } from './transformations.model';

export abstract class SolidBody {
  element: Element;
  isDragged = false;
  isMustDelete = false;

  constraints: Constraint[];
  corections: Vector[];
  impulses: Vector[];
  forces: Vector[];
  velocity: Vector;

  initPosition: Point;
  lastPosition: Point;
  position: Point;

  transformations: Transformations;

  invMass: number;
  mass: number;

  initSize: Size;
  size: Size;

  constructor(group: Node, initPosition: Point) {
    this.element = group as Element;

    let bounds: BoundRectangle = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    if (this.element?.getAttribute('r')) {
      const radius = +this.element.getAttribute('r');
      bounds = {
        x: +this.element.getAttribute('xPos'),
        y: +this.element.getAttribute('yPos'),
        width: radius * 2,
        height: radius * 2,
      };
    } else {
      const position = this.element.getBoundingClientRect();
      bounds = {
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
      };
    }

    // const bounds: BoundRectangle = {
    //   x: +this.element.getAttribute('xPos'),
    //   y: +this.element.getAttribute('yPos'),
    //   width: radius * 2,
    //   height: radius * 2
    // };
    this.size = new Size(bounds);
    this.initSize = new Size(bounds);

    this.constraints = [];
    this.transformations = new Transformations();

    this.mass = Math.PI * Math.pow(this.size.width / 2, 2);
    this.invMass = this.mass ? 1 / this.mass : 0;
    this.initPosition = initPosition;

    this.culcStartPosition(bounds);

    this.velocity = new Vector({ x: 0, y: 0 });

    this.forces = [];
    this.impulses = [];
    this.corections = [];
  }
  private culcStartPosition(bounds: BoundRectangle): void {
    let sideOfPositionX = 1;
    let sideOfPositionY = 1;
    if (this.initPosition.x > bounds.x + bounds.width / 2) {
      sideOfPositionX = -1;
    }
    if (this.initPosition.y > bounds.y + bounds.width / 2) {
      sideOfPositionY = -1;
    }

    this.position = {
      x: bounds.x * 1.25 * sideOfPositionX,
      y: bounds.y * 1.25 * sideOfPositionY,
    };
    this.lastPosition = this.position;
  }
}
