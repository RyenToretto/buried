import { Store, BuriedData, StoreOptions } from './store';
import { Timer } from './timer';

export interface BuriedOptions<TData> extends StoreOptions<TData> {
  /**
   * report period (ms), default 2 minutes
   */
  period?: number;
}

export default class Buried<TData> {
  private options: BuriedOptions<TData>;
  private store: Store<TData>;
  private timer: Timer;
  private listeners: ((data: TData[]) => void)[] = [];

  constructor(options: BuriedOptions<TData>) {
    this.options = options;
    this.store = new Store<TData>({
      url: options.url,
      getData: options.getData,
      setData: options.setData,
      report: options.report
    });
    this.timer = new Timer(options.period);
    this.timer.on(() => {
      const data: BuriedData<TData> = this.store.data;
      for (const fn of this.listeners) {
        if (fn && typeof fn === 'function') {
          fn(data.data);
        }
      }
      this.report();
    });
  }

  /**
   * put data to store
   * @param data TData | TData[]
   */
  put (data: TData | TData[]) {
    this.store.put(data);
  }

  /**
   * report data manually
   */
  report<TReturn> (): Promise<TReturn> {
    return this.store.report<TReturn>();
  }

  /**
   * reset data
   */
  reset () {
    this.store.reset();
  }

  /**
   * stop auto report
   */
  stop () {
    this.timer.stop();
  }

  /**
   * start auto report
   */
  start () {
    this.timer.start();
  }

  setPeriod (period: number) {
    this.timer.stop();
    this.options.period = period;
    this.timer.setPeriod(period);
    this.timer.start();
  }

  /**
   * invoke after auto reported
   * @param fn
   */
  onReport (fn: (data: TData[]) => void) {
    this.listeners.push(fn);
  }
}
