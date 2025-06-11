importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js",
);
firebase.initializeApp({
  apiKey: "AIzaSyBes3gKBThNR8KLf5Lt65phgQfQsk5-iR0",
  authDomain: "mattresses-441416.firebaseapp.com",
  projectId: "mattresses-441416",
  storageBucket: "mattresses-441416.firebasestorage.app",
  messagingSenderId: "727793797091",
  appId: "1:727793797091:web:d7dd210fede81f12e942d6",
  measurementId: "G-LDL3TEXXWJ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "🚀 ~ file: messaging.service.ts:17 ~ MessagingService ~ this.angularFireMessaging.onBackgroundMessage ~ payload:",
    payload.notification.body,
  );

  self.alert(payload.notification.body);
});

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.info("SW received the message: ", payload);
//   const notification = payload.notification;

//   const notificationTitle = notification.title;
//   const notificationOptions = {
//     body: notification.body,
//     icon: notification.image,
//     vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
//     actions: [
//       // First item is always taken as click action (see comment below)
//       {
//         title: "Visit",
//         action: notification.clickPath,
//       },
//     ],
//   };
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions,
//   );
// });
