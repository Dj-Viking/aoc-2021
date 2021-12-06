(async function(): Promise<void> {
  return new Promise(resolve => {
    console.log("hello world");
    resolve();
  })
})();