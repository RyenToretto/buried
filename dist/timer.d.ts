export declare class Timer {
    private period;
    private timer;
    private subscribers;
    constructor(period?: number);
    private emit;
    start(): void;
    stop(): void;
    on(fn: () => void): void;
    setPeriod(period?: number): void;
    getPeriod(): number;
}
