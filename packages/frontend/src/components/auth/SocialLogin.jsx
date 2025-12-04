import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup, getAuth
} from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SoclialLogin = () => {
  const { auth } = useSelector(state => state);
  const histore = useNavigate();
  useEffect(() => {
    if (auth.token) {
      return histore("/")
    }
  }, [auth.token, histore]);

  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google user info:', user);
      // You can send the user info to your backend for further processing
      
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };
  const handleLoginWithFacebook = async () => {
    try {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Facebook user info:', user);
      // You can send the user info to your backend for further processing
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  }

  return (
    <>
      {/* GOOGLE LOGIN */}
      <button id="google-login" onClick={handleLoginWithGoogle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_Logo_.svg"
          alt="Google"
        />
        <span>Login with Google</span>
      </button>
      {/* FACEBOOK LOGIN */}
      <button id="fb-login" onClick={handleLoginWithFacebook}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
          alt="Facebook"
        />
        <span>Login with Facebook</span>
      </button>
    </>

  );
};

export default SoclialLogin;
