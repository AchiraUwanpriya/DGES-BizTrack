// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
      
//       setInterval(() => {
//         registration.update();
//       }, 60 * 60 * 1000);

//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
        
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
              
//               if (window.confirm("New version available! Click OK to update.")) {
//                 installingWorker.postMessage({ type: 'SKIP_WAITING' });
//                 clearCacheAndRefresh();
//               }
              
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
              
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
      
//     });
// }



function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              
              const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
              const isStandalone = window.navigator.standalone;
              
               
              if (isIOS && isStandalone) {
                 
                if (window.confirm("New version is available! Click OK to update.")) {
                  installingWorker.postMessage({ type: 'SKIP_WAITING' });
                  clearCacheAndRefresh();
                }
              } else {
                
                if (window.confirm("New version available! Click OK to update.")) {
                  installingWorker.postMessage({ type: 'SKIP_WAITING' });
                  clearCacheAndRefresh();
                }
              }
              
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("Content is cached for offline use.");
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}



function checkValidServiceWorker(swUrl, config) {
  
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
       
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
       
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
    });
}

// function clearCacheAndRefresh() {
//   if ("caches" in window) {
//     // Clear all caches
//     caches.keys().then((cacheNames) => {
//       cacheNames.forEach((cacheName) => {
//         caches.delete(cacheName);
//       });
//     });
//   }
//   // Refresh the page
//   window.location.reload();
// }

function clearCacheAndRefresh() {
  if ("caches" in window) {
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      ).then(() => {
        // Unregister all service workers before reload
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            Promise.all(
              registrations.map((registration) => registration.unregister())
            ).then(() => {
              window.location.reload(true); // Force reload from server
            });
          });
        } else {
          window.location.reload(true);
        }
      });
    });
  } else {
    window.location.reload(true);
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
