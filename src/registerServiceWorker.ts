if ('serviceWorker' in navigator) {
  console.log('serviceWorker....');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`/service-worker.js`, { scope: '/' })
      .then(function () {
        console.log('Service Worker Registered');
      })
      .catch((err) => console.log(err));
  });
}
