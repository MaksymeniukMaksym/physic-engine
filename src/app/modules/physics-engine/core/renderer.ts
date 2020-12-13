export class Renderer {
  private rafId: number;
  private lastRun: number;
  private fpsInterval: number;
  private callback: RenderingCallback;

  constructor() {}

  public start(fps: number, callback: RenderingCallback) {
    this.lastRun = 0;
    this.fpsInterval = Math.floor(1000 / fps);
    this.callback = callback;
    this.rafId = window.requestAnimationFrame(t => this.animationStep(t));
  }

  public stop() {
    window.cancelAnimationFrame(this.rafId);
  }

  private animationStep(timestamp: number): void {
    const elapsed = timestamp - this.lastRun;

    // if (elapsed >= this.fpsInterval) {
    this.callback(this.lastRun ? elapsed : 0);
    this.lastRun = timestamp;
    // }

    this.rafId = window.requestAnimationFrame(t => this.animationStep(t));
  }
}

type RenderingCallback = (elapsed: number) => void;
