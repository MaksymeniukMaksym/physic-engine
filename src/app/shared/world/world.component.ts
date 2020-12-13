import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Point } from 'src/app/core/models/point';
import { MouseMoveService } from 'src/app/core/services/mouse.service';
import { BodiesFactory } from 'src/app/modules/physics-engine/core/factories/bodies.factory';
import { Renderer } from 'src/app/modules/physics-engine/core/renderer';
import { BubbleWorld } from 'src/app/modules/physics-engine/core/worlds/bubble.world';
import { Circle } from 'src/app/modules/physics-engine/models/circle.model';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {
  private renderer: Renderer = new Renderer();
  private resizeSubscribe: Subscription;
  private subscription: Subscription;
  private nativeElement: HTMLElement;
  private correctionY = 0;
  private scale = 1;

  @Input() centerX: number = 0;
  @Input() centerY: number = 0;
  @Input() boxWidth: number = 0;
  @Input() boxHeight: number = 0;
  @Input() xPos: number = 0;
  @Input() yPos: number = 0;

  constructor(
    private mouseMoveService: MouseMoveService,
    private elementRef: ElementRef,
    private zone: NgZone,
    private bubbleWorld: BubbleWorld,
    private bodiesFactory: BodiesFactory,
  ) {
    this.nativeElement = this.elementRef.nativeElement as HTMLElement;
  }
  ngOnInit(): void {
    this.subscription = this.mouseMoveService.mousePosition.subscribe();

    this.resizeSubscribe = fromEvent(window, 'resize').subscribe((res) => {
      this.calcScaleCorrection();
    });

    this.zone.runOutsideAngular(() => {
      this.renderer.start(60, (t) => this.animationStep(t));
      setInterval(() => {
        this.renderWorld();
      }, 16);
    });
  }
  ngAfterViewInit(): void {
    this.addBubblesToWorld();
    this.calcScaleCorrection();
    setTimeout(() => {
      this.calcScaleCorrection();
    }, 1000);
  }

  private calcScaleCorrection(): void {
    this.mouseMoveService.correction = new Point(this.xPos, this.yPos);
    this.mouseMoveService.scale = this.getScale();
    // this.mouseMoveService.correctionY = this.calcCorrectionY();
    this.renderWorldBody(this.correctionY);
  }

  private calcCorrectionY(): number {
    if (window.innerWidth > 2560) {
      this.correctionY = 0;
      return 0;
    }
    const bubbleAnimation = document.getElementById('bubbles-animation');
    const ElementHeight = bubbleAnimation.offsetHeight;

    const correctPositionY =
      (this.boxHeight * (1 - this.scale)) / 2 - (this.boxHeight - ElementHeight) * this.scale * 0.5;
    this.correctionY = correctPositionY;

    const relativePosition = document.documentElement.scrollTop;
    const relativeCorrection = bubbleAnimation.offsetParent.getBoundingClientRect().top + relativePosition;
    return correctPositionY + relativeCorrection;
  }

  private getScale(): number {
    const realWidth = this.nativeElement.offsetWidth;
    this.scale = realWidth / this.boxWidth;
    return this.scale;
  }
  private animationStep(elapsedTime: number): void {
    this.bubbleWorld.update(elapsedTime);
    // this.renderWorld();
  }

  private renderWorld(): void {
    for (const body of this.bubbleWorld.bodies) {
      const roundPosition = new Point(Math.round(body.position.x), Math.round(body.position.y));
      this.renderCircle(body as Circle);
      body.lastPosition = roundPosition;
    }
  }
  private renderWorldBody(correctY: number): void {
    const worldBody = this.elementRef.nativeElement;
    worldBody.style.transform = `translate(${this.xPos}px, ${correctY + this.yPos}px)`;
  }

  private renderCircle(body: Circle): void {
    const centerPosition = new Point(
      Math.round(body.position.x * this.scale),
      Math.round(body.position.y * this.scale)
    );
    const realRadius = body.radius * this.scale;
    const rWidth = realRadius * 2;
    const rHeight = realRadius * 2;
    const xPos = centerPosition.x - realRadius;
    const yPos = centerPosition.y - realRadius;
    const element = body.element as HTMLElement;

    element.style.width = rWidth + 'px';
    element.style.height = rHeight + 'px';

    element.style.transform = `translate(${xPos}px, ${yPos}px) `;
  }
  private addBubblesToWorld(): void {
    const bubbles: NodeList = this.elementRef.nativeElement.querySelectorAll('.bubble');
    this.bubbleWorld.bodies = this.bodiesFactory.buildBodies(bubbles, new Point(this.centerX, this.centerY));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.resizeSubscribe.unsubscribe();
    this.renderer.stop();
  }
}
