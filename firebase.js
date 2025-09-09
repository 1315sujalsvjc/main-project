(function(){
  // Initialize Firebase using compat SDK for simplicity
  try {
    if(window.firebase && (!firebase.apps || firebase.apps.length === 0)){
      const firebaseConfig = {
        apiKey: "AIzaSyDPuIl3qgRmUz-ScOH0daDgfrUpU5b3ubU",
        authDomain: "expense-tracker-60b90.firebaseapp.com",
        projectId: "expense-tracker-60b90",
        storageBucket: "expense-tracker-60b90.firebasestorage.app",
        messagingSenderId: "327502731470",
        appId: "1:327502731470:web:38a27e0a5fa2a3b2d1589f",
        measurementId: "G-LDKZ0YV4BG"
      };
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
      
      // Optional: analytics if needed and available
      if(firebase.analytics){ 
        try { 
          firebase.analytics(); 
          console.log('Firebase Analytics initialized');
        } catch(e){ 
          console.warn('Firebase Analytics failed to initialize:', e.message); 
        }
      }
    } else if(window.firebase && firebase.apps && firebase.apps.length > 0) {
      console.log('Firebase already initialized');
    } else {
      console.warn('Firebase SDK not loaded');
    }
  } catch(error) {
    console.error('Firebase initialization failed:', error);
  }
})();
