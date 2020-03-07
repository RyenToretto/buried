import Buried from '../src';
import { BuriedData } from '../src/store';

const storage: {
  __BURIED_DATA__: BuriedData
} = {
  __BURIED_DATA__: null
};

const buried = new Buried<string>({
  url: 'http://localhost:3000/report',
  period: 2000,
  getData (): BuriedData {
    return storage.__BURIED_DATA__;
  },
  setData (data: BuriedData) {
    storage.__BURIED_DATA__ = data;
  },
  report (url: string, data): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ url, data });
      }, 1000);
    });
  }
});

describe('custom storage', () => {

  test('set data', () => {
    buried.put('Buried data');
    expect(storage.__BURIED_DATA__.data[0]).toBe('Buried data');
    buried.put('Buried data');
    expect(storage.__BURIED_DATA__.data.length).toBe(2);
    expect(storage.__BURIED_DATA__.data[1]).toBe('Buried data');
  });

  test('reset', () => {
    buried.reset();
    expect(storage.__BURIED_DATA__.data.length).toBe(0);
  });

  test('report', async () => {
    buried.put('report test data');
    const result = await buried.report<{ url: string, data: string[] }>();
    expect(result.url).toBe('http://localhost:3000/report');
    expect(result.data.length).toBe(1);
    expect(result.data[0]).toBe('report test data');
    // clear local data after repoted
    expect(storage.__BURIED_DATA__.data.length).toBe(0);
  });

  test('auto report', () => {
    buried.put('auto report data');
    buried.stop();
    buried.start();
    return new Promise(resolve => {
      buried.onReport(data => {
        expect(data.length).toBe(1);
        expect(data[0]).toBe('auto report data');
        resolve();
      });
    });
  });
});

describe('localStorage', () => {});

afterAll(() => {
  buried.stop();
});
