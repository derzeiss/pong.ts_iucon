import { exec } from 'child_process';

exec(
  `
git pull
cd ${__dirname}
cd ../../../pong
npm run package
`,
  (err, stdout, stderr) => {
    console.log('Updating pong package...');
    if (stdout) console.log('STDOUT:', stdout);
    if (stderr) console.log('STDERR:', stderr);
    if (err) throw new Error(stderr);
    
    console.log('Successfully updated pong package.')
    console.log('--------------------------');
  }
);
