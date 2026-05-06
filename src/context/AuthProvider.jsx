// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { createContext, useCallback, useEffect, useState } from "react";
// import auth from "../firebase/firebase.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// export const AuthContext = createContext();

// const userCache = new Map();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const axiosPublic = useAxiosPublic();

//   // Auth functions
//   const createUser = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);

//   const signIn = (email, password) =>
//     signInWithEmailAndPassword(auth, email, password);

//   const logout = async () => {
//     userCache.clear();
//     setUser(null);
//     await signOut(auth);
//   };

//   const updateUserProfile = (profile) =>
//     updateProfile(auth.currentUser, profile);

//   const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

//   // Fetch user data (with cache)
//   const fetchUserData = useCallback(
//     async (currentUser) => {
//       const cacheKey = currentUser.email;

//       if (userCache.has(cacheKey)) {
//         return userCache.get(cacheKey);
//       }

//       try {
//         const res = await axiosPublic.get(`/users/${currentUser.email}`);
//         if (res.data) {
//           userCache.set(cacheKey, res.data);
//           return res.data;
//         }
//       } catch (err) {
//         console.error(err);
//       }

//       return null;
//     },
//     [axiosPublic]
//   );

//   // 🔥 MAIN FIX HERE
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser?.email) {
//         // ⚡ instant user set (NO WAIT)
//         setUser({
//           uid: currentUser.uid,
//           email: currentUser.email,
//           displayName: currentUser.displayName,
//           photoURL: currentUser.photoURL,
//           role: "user",
//         });

//         // 🚀 background API call
//         fetchUserData(currentUser).then((backendUser) => {
//           if (backendUser) {
//             setUser((prev) => ({
//               ...prev,
//               displayName:
//                 backendUser.name || prev.displayName,
//               photoURL:
//                 backendUser.imageUrl || prev.photoURL,
//               role: backendUser.role || "user",
//               _id: backendUser._id,
//               phone: backendUser.phone || "",
//               instituteName: backendUser.instituteName || "",
//             }));
//           }
//         });
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, [fetchUserData]);

//   const authInfo = {
//     user,
//     createUser,
//     signIn,
//     logout,
//     updateUserProfile,
//     forgotPassword,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;





import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useCallback, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const userCache = new Map();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important
  const axiosPublic = useAxiosPublic();

  // Auth functions
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    userCache.clear();
    setUser(null);
    await signOut(auth);
  };

  const updateUserProfile = (profile) =>
    updateProfile(auth.currentUser, profile);

  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  // Fetch backend user (cached)
  const fetchUserData = useCallback(
    async (currentUser) => {
      const cacheKey = currentUser.email;

      if (userCache.has(cacheKey)) {
        return userCache.get(cacheKey);
      }

      try {
        const res = await axiosPublic.get(`/users/${currentUser.email}`);
        if (res.data) {
          userCache.set(cacheKey, res.data);
          return res.data;
        }
      } catch (err) {
        console.error(err);
      }

      return null;
    },
    [axiosPublic]
  );

  // 🔥 Smart Auth Restore (NO UI BLOCK)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        // ⚡ instant user (NO WAIT → fast UI)
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: "user",
        });

        // 🚀 background backend fetch (non-blocking)
        fetchUserData(currentUser).then((backendUser) => {
          if (backendUser) {
            setUser((prev) => ({
              ...prev,
              displayName: backendUser.name || prev.displayName,
              photoURL: backendUser.imageUrl || prev.photoURL,
              role: backendUser.role || "user",
              _id: backendUser._id,
              phone: backendUser.phone || "",
            }));
          }
        });
      } else {
        setUser(null);
      }

      // 🔥 instantly stop loading (NO delay)
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    updateUserProfile,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;