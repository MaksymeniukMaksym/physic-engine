import { Point } from 'src/app/core/models/point';
import { Vector } from '../models/vector.model';

export class VectorMath {
  public static dotProduct(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }

  public static product(vector: Vector | Point, scalar: number): Vector {
    return new Vector({
      x: vector.x * scalar,
      y: vector.y * scalar
    });
  }

  public static cosAngleBetweenVectors(vector1: Vector, vector2: Vector): number {
    // cos α = (a·b /|a|·|b|)
    const dotProduct = this.dotProduct(vector1, vector2);
    const lengthProduct = vector1.getLength() * vector2.getLength();
    if (lengthProduct === 0) {
      return 0;
    }
    return dotProduct / lengthProduct;
  }

  public static add(vector1: Vector | Point, vector2: Vector | Point): Vector {
    const x = vector1.x + vector2.x;
    const y = vector1.y + vector2.y;

    return new Vector(new Point(x, y));
  }
}
