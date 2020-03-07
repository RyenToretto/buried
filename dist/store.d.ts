export interface BuriedData<TData = any> {
    version?: string;
    data: TData[];
    lastReportTime: number;
    lastUpdateTime?: number;
}
export interface StoreOptions<TData> {
    setData?: (data: BuriedData) => void;
    getData?: () => BuriedData;
    report?: (url: string, data: TData[]) => Promise<any>;
    url: string;
}
export declare class Store<TData> {
    private options;
    data: BuriedData<TData>;
    constructor(options: StoreOptions<TData>);
    private setData;
    private getData;
    private getInitData;
    reset(): void;
    put(data: TData | TData[]): void;
    report<TReturn>(): Promise<TReturn>;
}
