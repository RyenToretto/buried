export interface BuriedOptions {
    pushData: (data: any) => void;
    getData: () => any[];
    clearData: () => void;
}
export default class Buried {
    private store;
    private network;
    private timer;
    constructor(options: BuriedOptions);
}
