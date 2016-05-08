import 'babel-polyfill'

// TODO あとで消す
// const sleep = (msec) => new Promise((resolve) => {
//     setTimeout(resolve, msec)
// });
//
// (async () => {
//     console.log('start');
//     await sleep(2000);
//     console.log('end');
// })()

document.write('It works.')

import RGPP from 'RGPP'
import test from './templates/test.html'
console.log(RGPP)
console.log(test)
document.body.innerHTML = test

console.log(RGPP.System.Utils.BrowserUtil.getUserBrowserInfo())
