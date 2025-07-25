import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface GoogleLoginProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

function GoogleLogin({ onSuccess, onError }: GoogleLoginProps) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    };
    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "938280302594-av3f2ogqboi37hdilu9tbtmh5984dui2.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signin_with",
            locale: "zh_TW"
          }
        );
      }
    };
    const handleCredentialResponse = async (response: any) => {
      try {
        if (!response.credential) {
          throw new Error("查無 Google 憑證。");
        }
        await googleLogin(response.credential);
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Google 登入處理失敗：", error);
        const errorMessage = error instanceof Error ? error.message : "Google 登入失敗。";
        if (onError) {
          onError(errorMessage);
        }
      }
    };
    loadGoogleScript();
    return () => {
      const script = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
      if (script) {
        script.remove();
      }
    };
  }, [googleLogin, navigate, onSuccess, onError]);

  return (
    <div className="w-full">
      <div id="google-signin-button" className="w-full"></div>
    </div>
  );
}

export default GoogleLogin;
