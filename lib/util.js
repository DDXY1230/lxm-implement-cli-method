const ora = require("ora");
async function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message); // 转圈的下载提示消息
  spinner.start(); // 开启下载
  try {
    let repos = await fn(...args);
    // console.log('拿到仓库或者版本好', repos)
    spinner.succeed(); // 成功了
    return repos;
  } catch (e) {
    spinner.fail("request failed, refetch......"); // 失败的提示
    await sleep(1000)
    return wrapLoading(fn, message, ...args)
  }
}
module.exports = {
  sleep,
  wrapLoading
}