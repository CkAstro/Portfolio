// see timing stuff here https://stackoverflow.com/questions/45478730/jest-react-testing-check-state-after-delay

const flushPromises = () => new Promise(jest.requireActual('timers').setImmediate);

export const advanceTimersByTime = async (msToAdvance: number) => {
   jest.advanceTimersByTime(msToAdvance);
   await flushPromises();
};

export const advanceRealTime = async (msToAdvance: number) =>
   new Promise<void>((resolve) => {
      const intervalId = setInterval(async () => {
         resolve();
         clearInterval(intervalId);
      }, msToAdvance);
   });
