const CACHE='mukryong-20261027-110612';
const FILES=["./", "index.html", "character/mukryong.png", "audio/han.mp3", "audio/index.json", "audio/misc.mp3", "audio/sents.mp3", "audio/words.mp3", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "manifest.webmanifest"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mukryong-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const page=r.mode==='navigate';
  e.respondWith(page
    ?fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./',cp));return res;}).catch(()=>caches.match('./'))
    :caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r)));});
