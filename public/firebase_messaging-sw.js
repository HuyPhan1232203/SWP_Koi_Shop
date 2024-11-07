
// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in your app's Firebase config object.
const firebaseConfig = {
    apiKey: "AIzaSyCLWV9212cdv_2IMeARo8NnOkUjFXeVm1Q",
    authDomain: "koimanagement-cd9bd.firebaseapp.com",
    projectId: "koimanagement-cd9bd",
    storageBucket: "koimanagement-cd9bd.appspot.com",
    messagingSenderId: "918677205217",
    appId: "1:918677205217:web:f74b5b4c8c1ef2b773c7a0",
    measurementId: "G-SXF7MERSZ8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle =
    payload.notification?.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification?.body || "Background Message body.",
    icon: payload.notification?.icon || "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});