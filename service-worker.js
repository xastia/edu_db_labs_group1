/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4fc073ff6f09fae5ecb3fcf0747a30b6"
  },
  {
    "url": "assets/css/0.styles.cfd04edd.css",
    "revision": "a9216f2990ee289c17a00ba5ae1b252e"
  },
  {
    "url": "assets/img/relation-diagram.60415180.png",
    "revision": "604151805a60802b9e5d02489fbbe1d3"
  },
  {
    "url": "assets/img/screenAdd.3d2713b1.png",
    "revision": "3d2713b1af6a6ac3ebf8b865251be167"
  },
  {
    "url": "assets/img/screenDelete.81287f64.png",
    "revision": "81287f64fd2b2dd25c275789aae9b2e0"
  },
  {
    "url": "assets/img/screenGet.5848f956.png",
    "revision": "5848f9565decba84429275c864908a18"
  },
  {
    "url": "assets/img/screenGetAll.8d4fdeaf.png",
    "revision": "8d4fdeaf8bfea7eaaa9b26027edbd098"
  },
  {
    "url": "assets/img/screenUpdate.19dd0377.png",
    "revision": "19dd0377db017c37e088f91d0e0035c2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ede44feb.js",
    "revision": "a5fdc61680aa686098ead5585865520b"
  },
  {
    "url": "assets/js/11.a0526c92.js",
    "revision": "4a4cbe9dba2fe96205db2667a78b4de9"
  },
  {
    "url": "assets/js/12.dcaae35a.js",
    "revision": "43fa593a39277d240494bb4077ec736e"
  },
  {
    "url": "assets/js/13.959bc123.js",
    "revision": "12277b5b437715e2310c14578bed5f34"
  },
  {
    "url": "assets/js/14.8f7aa86f.js",
    "revision": "d2cc03f4dd624415723c52769c7b6fe0"
  },
  {
    "url": "assets/js/15.4a88242b.js",
    "revision": "eac604ff9653af21fe4e4794c561f7d1"
  },
  {
    "url": "assets/js/16.cc040ebc.js",
    "revision": "80d237b15950bacae244c6626b2eef82"
  },
  {
    "url": "assets/js/17.7d598db9.js",
    "revision": "94ab84353b36eb236a7e164238d42440"
  },
  {
    "url": "assets/js/18.395825b6.js",
    "revision": "9cb619c9387890329066bbc91638a6c7"
  },
  {
    "url": "assets/js/19.7ffe3dc2.js",
    "revision": "c6284621bcc140db45f95dee7b8f67f6"
  },
  {
    "url": "assets/js/2.4abc21d7.js",
    "revision": "96cf7e616365ba1d7ef3f6fa6c3cfaae"
  },
  {
    "url": "assets/js/20.9687766e.js",
    "revision": "9b0870de857322390487d003edfb53ff"
  },
  {
    "url": "assets/js/21.013aec28.js",
    "revision": "ef7a4641923a594e4a26fbf88150e7e4"
  },
  {
    "url": "assets/js/22.7e6a26bc.js",
    "revision": "29bb902bc907e27868e901e21c21678c"
  },
  {
    "url": "assets/js/23.396405ed.js",
    "revision": "1bf452827051ef649eee1d4f123bbb6d"
  },
  {
    "url": "assets/js/24.d454c6ad.js",
    "revision": "2ca008dcc3251927ea286cf5e3983fdb"
  },
  {
    "url": "assets/js/26.8925e476.js",
    "revision": "60c5ae44e9de26fbdaa7a983ce917288"
  },
  {
    "url": "assets/js/3.5150b43c.js",
    "revision": "fe96fb31153dc665b460d75389e28951"
  },
  {
    "url": "assets/js/4.8109d034.js",
    "revision": "0c6811f2fe35092c74bc3acc7613afc0"
  },
  {
    "url": "assets/js/5.b6c0f9fe.js",
    "revision": "1ca04c2f67208cdc138ff2bdb723dd11"
  },
  {
    "url": "assets/js/6.a5eceeec.js",
    "revision": "ccffa3b74a48481f4deecbdf9fdfb1ab"
  },
  {
    "url": "assets/js/7.9912ff25.js",
    "revision": "5dd096a048e9bd2b58f2104d1ff0aaae"
  },
  {
    "url": "assets/js/8.90af8cbb.js",
    "revision": "b6c4db4fa28fc934f623035634c9d82b"
  },
  {
    "url": "assets/js/9.2fa1b748.js",
    "revision": "7f44f36e25e9cc48e262a648b04ed443"
  },
  {
    "url": "assets/js/app.a056b0f2.js",
    "revision": "61e5f854011489f17c8b9c7f39fe33e7"
  },
  {
    "url": "conclusion/index.html",
    "revision": "0fb17076300da2bd7b088c4101093713"
  },
  {
    "url": "design/index.html",
    "revision": "7c25ebe653750306fd3319ca3f3dc256"
  },
  {
    "url": "index.html",
    "revision": "e76468434e411bdc9432432b73febb9f"
  },
  {
    "url": "intro/index.html",
    "revision": "dd85063c6bb45c5a4f1f507c89c3202c"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "d31d9c6b5058c5f11caa392ded3a1fe7"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "d880985d2ede68a35a94f7cd55e25d9f"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "01131f788c7db1d6e0ba54bcaab93165"
  },
  {
    "url": "software/index.html",
    "revision": "f147cf4c108089d2ce491c28eee30ee3"
  },
  {
    "url": "test/index.html",
    "revision": "94d07b8fb3ca3adb779730dc52a58c60"
  },
  {
    "url": "use cases/index.html",
    "revision": "8242d9b148aa4527c659f9c45e9866b5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
