document.addEventListener('DOMContentLoaded', function () {


});

function startfirebase() {
    console.log("startup...");

    const firebaseConfig = {
        apiKey: "AIzaSyC6Cq8c5jprpZYin5iB_KSAdatFbRPicfk",
        authDomain: "ytbeam.firebaseapp.com",
        databaseURL: "https://ytbeam-default-rtdb.firebaseio.com",
        projectId: "ytbeam",
        storageBucket: "ytbeam.appspot.com",
        messagingSenderId: "161790539788",
        appId: "1:161790539788:web:c7277bb637e4a5dda39629"
    };

    if (!firebase.apps.length) {
        var app = firebase.initializeApp(firebaseConfig);
        console.log("startup");
    }
}

function redirect(user) {
    console.log("redirecting...");
    let tags = getParams(window.location.href);
    console.log(tags)
    if (tags.id != undefined) {
        newurl = "/room.html" + '?v=' + window.location.search;
        window.location.href = newurl;
    } else {
        newurl = "";
        window.location.replace(window.location.protocol + '//' + window.location.hostname + ':' + location.port);
    }
}

function login() {

    firebase.auth().onAuthStateChanged((user) => {
        console.log("auth changed");
        if (user) {
            redirect();
        } else {
            console.log("no user, this is expected");
        }
    });

    gauth = new firebase.auth.GoogleAuthProvider();
    // using the object we will authenticate the user.
    firebase.auth().signInWithPopup(gauth);
}

function anonlogin() {
    startfirebase();

    firebase.auth().signInAnonymously()
        .then(() => {
            redirect();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("anon login error");
        });
}

function logout() {
    startfirebase();

    firebase.auth().signOut();
    console.log("logged out");
    window.location.href = "https://ytbeam-landing.webflow.io"
}

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('?').join(', ').split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};