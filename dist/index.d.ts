import { StoreOptions } from './store';
export interface BuriedOptions<TData> extends StoreOptions<TData> {
    period?: number;
}
export default class Buried<TData> {
    private options;
    private store;
    private timer;
    private listeners;
    constructor(options: BuriedOptions<TData>);
    put(data: TData | TData[]): void;
    report<TReturn>(): Promise<TReturn>;
    reset(): void;
    stop(): void;
    start(): void;
    setPeriod(period: number): void;
    onReport(fn: (data: TData[]) => void): void;
}
