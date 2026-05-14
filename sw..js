const basePath = new URL("./", self.registration.scope).pathname;

importScripts(basePath + "scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    await scramjet.loadConfig();

    if (scramjet.route(event)) {
      return scramjet.fetch(event);
    }

    return fetch(event.request);
  })());
});
