import 'babel-polyfill';

// TODO あとで消す
const sleep = (msec) => new Promise((resolve) => {
  setTimeout(resolve, msec);
});

(async () => {
  console.log('start');
  await sleep(2000);
  console.log('end');
})();

document.write("It works.");

import Core from './Core'
console.log(Core)
import System from './System'
import MW from './MW'
import User from './User'
