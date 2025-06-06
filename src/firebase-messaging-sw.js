importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js",
);
firebase.initializeApp({
  apiKey: "AIzaSyCTmdLws7K8FXOuqcveVdGyHJOw6Eetut8",
  authDomain: "mattress-97c3d.firebaseapp.com",
  databaseURL:
    "https://mattress-97c3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mattress-97c3d",
  storageBucket: "mattress-97c3d.firebasestorage.app",
  messagingSenderId: "345063740261",
  appId: "1:345063740261:web:e6aae939c8a15ee5ae878c",
  measurementId: "G-62S9WK55NB",
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

messaging.setBackgroundMessageHandler(function (payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath,
      },
    ],
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
