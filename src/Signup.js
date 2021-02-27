import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import avatar from "./avatar_user0.png";

var uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
            const userInfo = authResult.additionalUserInfo;
            // console.log(userInfo);
            if (userInfo.isNewUser && userInfo.providerId === "password") {
                try {
                    await authResult.user.sendEmailVerification();
                    console.log("Check your email.");
                } catch (e) {
                    console.log(e);
                }
            } else {
                return false;
            }
        },
    },
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log("Successufully Signed out");
        })
        .catch(function () {
            console.log("Error Signed out");
        });
};

const Signup = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authObserver = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return authObserver;
    });

    console.log("user", user);

    if (user) {
        return (
            <>
                <img
                    style={{ borderRadius: "50%" }}
                    src={user.photoURL || avatar}
                    alt="Gotcha Error!`"
                />
                <p>
                    Welcome, {user.displayName} <br />
                    <small>{user.email}</small> <br />
                    <button onClick={signOut}>Sign out</button>
                </p>
            </>
        );
    } else {
        return (
            <>
                <div>Login / SignUp System</div>
                <StyleFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </>
        );
    }
};

export default Signup;
