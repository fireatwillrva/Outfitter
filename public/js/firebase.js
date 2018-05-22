var config = {
    apiKey: "AIzaSyC9V3KYVVj2rt4HxZf-93veFlGLQ38hOkk",
    authDomain: "outfitter-a3fdd.firebaseapp.com",
    databaseURL: "https://outfitter-a3fdd.firebaseio.com",
    projectId: "outfitter-a3fdd",
    storageBucket: "outfitter-a3fdd.appspot.com",
    messagingSenderId: "834658064656"
};
firebase.initializeApp(config);

var userid;

var firebasePost = function (table, userid, file,data) {
    var storageRef = firebase.storage().ref(`/${userid.uid}/${table}/${file.name}`);
    var uploadTask = storageRef.put(file);
   uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        var Clothing_item = {
            user_id: userid.uid,
            type: data.type,
            name: data.name,
            img_url: downloadURL,
        };
        $.post("/api/clothing_items", Clothing_item);
    });
  });
}
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        userid = user;
        console.log("welcome")
    }
    if(user == undefined) {
        console.log("hello")
        if(window.location != "http://localhost:8080/") {
            console.log("goodbye")
            window.location = "/"
        }
    }
});
$(document).ready(function () {
   
    $("#login").click(function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in userid info.
            userid = result.user;
            console.log("Signed In")
            window.location="/route";
        }).catch(function (error) {
            // Handle Errors here.
            if (error.code === 'auth/account-exists-with-different-credential') {
                // Step 2.
                // userid's email already exists.
                // The pending Google credential.
                var pendingCred = error.credential;
                // The provider account's email address.
                var email = error.email;
                // Get sign-in methods for this email.
                auth.fetchSignInMethodsForEmail(email).then(function (methods) {
                    // Step 3.
                    // If the userid has several sign-in methods,
                    // the first method in the list will be the "recommended" method to use.
                    if (methods[0] === 'password') {
                        // Asks the userid his password.
                        // In real scenario, you should handle this asynchronously.
                        var password = promptuseridForPassword(); // TODO: implement promptuseridForPassword.
                        auth.signInWithEmailAndPassword(email, password).then(function (userid) {
                            // Step 4a.
                            return userid.link(pendingCred);
                        }).then(function () {
                            // Google account successfully linked to the existing Firebase userid.
                            goToApp();
                        });
                        return;
                    }
                    // All the other cases are external providers.
                    // Construct provider object for that provider.
                    // TODO: implement getProviderForProviderId.
                    var provider = getProviderForProviderId(methods[0]);
                    // At this point, you should let the userid know that he already has an account
                    // but with a different provider, and let him validate the fact he wants to
                    // sign in with this provider.
                    // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
                    // so in real scenario you should ask the userid to click on a "continue" button
                    // that will trigger the signInWithPopup.
                    auth.signInWithPopup(provider).then(function (result) {
                        // Remember that the userid may have signed in with an account that has a different email
                        // address than the first one. This can happen as Firebase doesn't control the provider's
                        // sign in flow and the userid is free to login using whichever account he owns.
                        // Step 4b.
                        // Link to Google credential.
                        // As we have access to the pending credential, we can directly call the link method.
                        result.userid.linkAndRetrieveDataWithCredential(pendingCred).then(function (useridcred) {
                            // Google account successfully linked to the existing Firebase userid.
                            goToApp();
                        });
                    });
                });
            }
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the userid's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });
    $("#signout").click(function () {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
            userid = undefined;
            window.location="/";
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    })
   
});