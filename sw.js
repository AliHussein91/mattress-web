'use strict';

const version = 1;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);

main().catch(console.error);
// ****************************************************
// intialize the service worker every time (it is run every time the service worker is started even if it is already installed)
async function main() {
  console.log(`Service worker(${version}) is starting...`);
}

async function onInstall(evt) {
  console.log(`Service worker(${version}) installed...`);
  // The skipWaiting() method of the ServiceWorkerGlobalScope interface forces the waiting service worker to become the active service worker.
  // Use this method with Clients.claim() to ensure that updates to the underlying service worker take effect immediately for both the current client and all other active clients.
  self.skipWaiting();
}

async function onActivate(evt) {
  console.log(`Service worker(${version}) activated...`);
  // tell the browser i'm still doing something please don't terminate me (shut me down)
  // pass a promise to the waitUntil() method to extend the lifetime of the event
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  // tell the page i'm taking control of the page
  await clients.claim();
  console.log(`Service worker(${version}) is activated...`);
}
