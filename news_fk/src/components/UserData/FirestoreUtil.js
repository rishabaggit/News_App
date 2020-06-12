/* eslint-disable camelcase */
import { db } from '../UserAuthentication/firebase';
import firebase from 'firebase';

async function userget(uid) {
	let res = await db.collection('users').doc(uid).get();
	return res.data();
}

const newUser = (uid, fname, lname) => {
	db.collection('users').doc(uid).set({
		first_name: fname,
		last_name: lname
	}, { merge: true })
		.then()
		.catch(err => console.log(err));
};

const addLike = (uid, url) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayUnion(url)
	})
		.then()
		.catch(err => console.log(err));
};

const removeLike = (uid, url) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayRemove(url)
	})
		.then()
		.catch(err => console.log(err));
};

const newMessage = (uid, message) => {
	userget(uid).then(userData => {
		const msg = {
			username: userData.first_name + ' ' + userData.last_name,
			message: message,
			email: uid
		};
		db.collection('chat').doc('GroupChat').update({
			CHAT: firebase.firestore.FieldValue.arrayUnion(msg)
		})
			.then()
			.catch(err => console.log(err));
	}
	);
};

const forgetPassword = (email) => {
	firebase.auth().sendPasswordResetEmail(email)
		.then(function () {
			alert('Password link sent successfully to' + email);
		}).catch(function (e) {
			console.log(e);
		});
};

export { newUser, userget, addLike, removeLike, newMessage, forgetPassword };