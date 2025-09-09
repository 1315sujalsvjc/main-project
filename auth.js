(function(){
  function hasFirebase(){ 
    try {
      return typeof window !== 'undefined' && 
             window.firebase && 
             firebase.apps && 
             firebase.apps.length > 0 && 
             firebase.auth;
    } catch(e) {
      console.warn('Firebase check failed:', e.message);
      return false;
    }
  }

  function getSession(){
    try { return JSON.parse(localStorage.getItem('bp_session') || 'null'); } catch { return null; }
  }
  function getUsers(){
    try { return JSON.parse(localStorage.getItem('bp_users') || '{}'); } catch { return {}; }
  }

  function guardRoute(){
    if(hasFirebase()){
      // Wait a bit for Firebase to fully initialize
      setTimeout(() => {
        firebase.auth().onAuthStateChanged(function(user){
          if(!user){
            window.location.href = 'login.html';
            return;
          }
          const welcome = document.getElementById('welcomeText');
          if(welcome){ welcome.textContent = `Hi, ${user.displayName || user.email}`; }
        });
      }, 100);
      return;
    }
    const session = getSession();
    if(!session || !session.email){
      window.location.href = 'login.html';
      return;
    }
    const users = getUsers();
    const user = users[session.email];
    if(!user){
      localStorage.removeItem('bp_session');
      window.location.href = 'login.html';
      return;
    }
    const welcome = document.getElementById('welcomeText');
    if(welcome){ welcome.textContent = `Hi, ${user.name}`; }
  }

  function redirectIfAuthenticated(){
    if(hasFirebase()){
      // Wait a bit for Firebase to fully initialize
      setTimeout(() => {
        firebase.auth().onAuthStateChanged(function(user){
          if(user){ window.location.href = 'index.html'; }
        });
      }, 100);
      return;
    }
    const session = getSession();
    if(session && session.email){
      window.location.href = 'index.html';
    }
  }

  function logout(){
    if(hasFirebase()){
      firebase.auth().signOut().then(function(){
        window.location.href = 'login.html';
      }).catch(function(){ window.location.href = 'login.html'; });
      return;
    }
    localStorage.removeItem('bp_session');
    window.location.href = 'login.html';
  }

  window.guardRoute = guardRoute;
  window.redirectIfAuthenticated = redirectIfAuthenticated;
  window.logout = logout;

  window.addEventListener('DOMContentLoaded', function(){
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){ logoutBtn.addEventListener('click', logout); }
  });
})();


