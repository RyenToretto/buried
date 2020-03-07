export class Timer {

  private period: number = 1000 * 60 * 2;
  private timer: any;
  private subscribers: (() => void)[] = [];

  constructor(period?: number) {
    this.setPeriod(period);
    this.start();
  }

  private emit () {
    for (const fn of this.subscribers) {
      if (fn && typeof fn === 'function') {
        fn();
      }
    }
  }

  start () {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.emit();
    }, this.period);
  }

  stop () {
    clearInterval(this.timer);
  }

  on (fn: () => void) {
    this.subscribers.push(fn);
  }

  setPeriod (period?: number) {
    if (period) {
      this.period = period;
    }
  }

  getPeriod (): number {
    return this.period;
  }
}
