import childProcess from 'child_process';

export function runScript(scriptPath: string) {
  let promiseDone = false;
  return new Promise((res, rej) => {
    const process = childProcess.fork(scriptPath);

    process.on('error', (err) => {
      if (promiseDone) return;
      promiseDone = true;
      rej(err);
    });

    process.on('exit', (code) => {
      if (promiseDone) return;
      promiseDone = true;
      if (code === 0) {
        res(null);
      } else {
        const err = new Error(`Script "${scriptPath}" exited with code: "${code}"`);
        rej(err);
      }
    });
  });
}
