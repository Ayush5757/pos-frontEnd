import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { login, loginGoogle } from "../services/api/login";
import { useMutation } from "@tanstack/react-query";
import { shoeNotification } from "../components/Notify";
import { setAccessToke } from "./constFunction";

const firebaseConfig = {
  apiKey: "AIzaSyDn4LEw_KFUAYKAoHaqoBVuMDuffTzWahg",
  authDomain: "foodeindia0507.firebaseapp.com",
  projectId: "foodeindia0507",
  storageBucket: "foodeindia0507.firebasestorage.app",
  messagingSenderId: "1040482532033",
  appId: "1:1040482532033:web:b2dff645fd54469f8d3240",
  measurementId: "G-CBNPH82PVQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const setGstLocal = (data)=>{
    localStorage.setItem('GSTIN',data)
  }
const handelGoogleLogin = async (navigate) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    // const idToken = await user.getIdToken();

    const res = await loginGoogle({
      email: user?.email,
      id: user?.uid,
      emailVerified: user?.emailVerified,
    });
    if (res?.data?.user?._id) {
      setAccessToke(res?.data?.token);
      localStorage.setItem("shop_user_id", res?.data?.user?._id);
      localStorage.setItem("address", res?.data?.user?.address);
      localStorage.setItem("phone", res?.data?.user?.phone);
      localStorage.setItem("shopName", res?.data?.user?.shopName);
      setGstLocal(res?.data?.user?.gstin);
      shoeNotification("success", "Google Login Successfull");
      navigate("/dashboard");
    }
  } catch (err) {
    shoeNotification("error", "User not Exist Please SignUp first");
  }
};

export { auth, googleProvider, handelGoogleLogin };
