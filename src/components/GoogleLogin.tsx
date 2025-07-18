import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

function GoogleLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: "938280302594-av3f2ogqboi37hdilu9tbtmh5984dui2.apps.googleusercontent.com",
      callback: credentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const credentialResponse = async (response: any) => {
    const id_token = response.credential;
    try {
      const response = await fetch("http://localhost:8000/api/members/google-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token: id_token
        }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user);
        navigate("/");
      } else {
        alert(data.error || "Google 登入失敗。");
      }
    } catch (e) {
      alert("無法登入。");
      console.error(e);
    }
  };
  return (
    <div id="google-signin" className="mt-6 flex justify-center" />
  )
}

export default GoogleLogin;
