async function userLogin(event) {
    event.preventDefault();
  
    const username = document.querySelector("#user-name-login").value.trim();

    const password = document.querySelector("#password-login").value.trim();
   
    if (username && password) {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });
    console.log(username, password)
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to log in");
        }
      }
    }
    document.addEventListener("DOMContentLoaded", () => {
        const loginLink = document.querySelector("#login-link");
      
        if (loginLink) {
          loginLink.addEventListener("click", (event) => {
            event.preventDefault();
            document.location.replace("/login");
          });
        }
      });
      document.addEventListener("DOMContentLoaded", () => {
        const loginForm = document.querySelector(".login-form");
      
        if (loginForm) {
          loginForm.addEventListener("submit", userLogin);
        }
      });
      document.addEventListener("DOMContentLoaded", () => {
        const signupButton = document.querySelector(".signup-button");
      
        if (signupButton) {
          signupButton.addEventListener("click", (event) => {
            event.preventDefault();
            document.location.replace("/signup");
          });
        }
      });
      