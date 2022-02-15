"use strict";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("fect", event => {
  event.respondWith(fetch(event.request));
});