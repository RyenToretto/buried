export interface BuriedData<TData = any> {
  /**
   * buried version
   */
  version?: string;
  /**
   * buried point data array
   */
  data: TData[];
  lastReportTime: number;
  lastUpdateTime?: number;
}

export interface StoreOptions<TData> {
  /**
   * set data to storage, default using localStorage
   */
  setData?: (data: BuriedData) => void;
  /**
   * get data from storage, default using localStorage
   */
  getData?: () => BuriedData;
  /**
   * report buried point data, default using fetch
   */
  report?: (url: string, data: TData[]) => Promise<any>;
  /**
   * report url
   */
  url: string;
}

const STORE_NAME = '__BURIED_DATA__';

export class Store<TData> {

  private options: StoreOptions<TData>;
  data: BuriedData<TData> = this.getInitData();

  constructor(options: StoreOptions<TData>) {
    this.options = options;
    const localData = this.getData();
    if (localData) {
      this.data = localData;
    }
  }

  private setData (data: BuriedData) {
    if (this.options.setData) {
      this.options.setData(data);
      return;
    }
    if (window && window.localStorage) {
      window.localStorage.setItem(STORE_NAME, JSON.stringify(data));
    } else {
      throw new Error('[Buried] need to provide storage methods for current environment!');
    }
  }

  private getData (): BuriedData<TData> | null {
    if (this.options.getData) {
      return this.options.getData();
    }
    if (window && window.localStorage) {
      const str = window.localStorage.getItem(STORE_NAME);
      if (str) {
        try {
          const data: BuriedData = JSON.parse(str);
          return data;
        } catch (e) {
          return null;
        }
      } else {
        return null;
      }
    } else {
      throw new Error('[Buried] need to provide storage methods for current environment!');
    }
  }

  private getInitData (): BuriedData<TData> {
    return {
      version: '1.0.0',
      data: [],
      lastReportTime: new Date().getTime(),
      lastUpdateTime: new Date().getTime()
    };
  }

  reset () {
    this.data = this.getInitData();
    this.setData(this.data);
  }

  put (data: TData | TData[]) {
    if (!data) {
      return;
    }
    if (!this.data.data) {
      this.data.data = [];
    }
    if (Array.isArray(data)) {
      this.data.data.push(...data);
    } else {
      this.data.data.push(data);
    }
    this.data.lastUpdateTime = new Date().getTime();
    this.setData(this.data);
  }

  async report<TReturn> (): Promise<TReturn> {
    if (this.options.report) {
      const res: TReturn = await this.options.report(this.options.url, this.data.data);
      this.reset();
      return res;
    }
    if (window && window.fetch) {
      const options: RequestInit = {
        method: 'POST'
      };
      return fetch(this.options.url, options).then(res => {
        console.log(res);
        return res.json();
      });
    }
    throw new Error('[Buried] need to provide report method for current environment!');
  }

}
