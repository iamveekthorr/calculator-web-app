if ('serviceWorker' in navigator) {
  console.log('serviceWorker....');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${window.location.href}src/service-worker.js`)
      .then(function () {
        console.log('Service Worker Registered');
      })
      .catch((err) => console.log(err));
  });
}
