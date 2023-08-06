import now from './now';

describe('#now', () => {
  let windowSpy: jest.SpyInstance;
  let performanceSpy: jest.SpyInstance;
  let dateSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
    performanceSpy = jest.spyOn(window.performance, 'now');
    dateSpy = jest.spyOn(Date, 'now');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls performance.now() when performance is in window', () => {
    now();

    expect(performanceSpy).toHaveBeenCalled();
  });

  it('calls Date.now() when window is not defined', () => {
    windowSpy.mockImplementation(() => undefined);

    now();

    expect(dateSpy).toHaveBeenCalled();
  });

  it('calls Date.now() when performance is not in window', () => {
    windowSpy.mockImplementation(() => { });

    now();

    expect(dateSpy).toHaveBeenCalled();
  });
});
