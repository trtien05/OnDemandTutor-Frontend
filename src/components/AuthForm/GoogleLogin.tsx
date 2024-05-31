import { useEffect, useRef } from "react";
import config from "../../config";

type GoogleLoginProps = {
  onGoogleSignIn?: (value: any) => void;
  text?: string;
};

const GoogleLogin: React.FC<GoogleLoginProps> = ({
  onGoogleSignIn = () => { },
  text = "signin_with",
}) => {
  const googleSignInButton = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: config.publicRuntime.GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });

    window.google.accounts.id.renderButton(
      googleSignInButton.current!,
      { theme: "outlined", size: "large", text, width: "370", } // customization attributes
    );
  }, [])



  return <div style={{ 'marginTop': '20px' }} ref={googleSignInButton}></div>;
};

export default GoogleLogin;
