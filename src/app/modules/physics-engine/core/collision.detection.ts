import { CollidedPair } from '../models/collided-pair.model';
import { SolidBody } from '../models/solid-body.model';
import { Circle } from '../models/circle.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CollisionDetection {
  constructor() {}

  public checkCollision(circles: Array<SolidBody>): CollidedPair[] {
    const collisionCircles: CollidedPair[] = [];

    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        if (this.isCollided(circles[i], circles[j])) {
          collisionCircles.push({ firstItem: circles[i], secondItem: circles[j] });
        }
      }
    }
    return collisionCircles;
  }

  private isCollided(firstElement: SolidBody, secondElement: SolidBody): boolean {
    if (this.isSquareCollided(firstElement, secondElement)) {
      return false;
    }

    if (firstElement instanceof Circle && secondElement instanceof Circle) {
      return this.isCircleCollided(firstElement, secondElement);
    }

    return false;
  }

  private isSquareCollided(firstElement: SolidBody, secondElement: SolidBody): boolean {
    return !(
      secondElement.size.left > firstElement.size.right ||
      secondElement.size.right < firstElement.size.left ||
      secondElement.size.top < firstElement.size.bottom ||
      secondElement.size.bottom > firstElement.size.top
    );
  }

  private isCircleCollided(firstElement: Circle, secondElement: Circle): boolean {
    const distanceSqr =
      (firstElement.position.x - secondElement.position.x) * (firstElement.position.x - secondElement.position.x) +
      (firstElement.position.y - secondElement.position.y) * (firstElement.position.y - secondElement.position.y);

    const sumOfRadius = firstElement.radius + secondElement.radius;

    return distanceSqr < sumOfRadius * sumOfRadius;
  }
}
