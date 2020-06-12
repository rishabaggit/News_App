/* eslint-disable camelcase */
import { db } from '../UserAuthentication/firebase';
import firebase from 'firebase';

async function userget(uid: string) {
	let res = await db.collection('users').doc(uid).get();
	return res.data();
}

const newUser = (uid: string, fname: string, lname: string) => {
	db.collection('users').doc(uid).set({
		first_name: fname,
		last_name: lname
	}, { merge: true })
		.then()
		.catch(err => console.log(err));
};

const addLike = (uid: string, newsItem: Object) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayUnion(newsItem)
	})
		.then()
		.catch(err => console.log(err));
};

const removeLike = (uid: string, newsItem: Object) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayRemove(newsItem)
	})
		.then()
		.catch(err => console.log(err));
};

const newMessage = (uid: string, message: string) => {
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

const forgetPassword = (email: string) => {
	firebase.auth().sendPasswordResetEmail(email)
		.then(function () {
			alert('Password link sent successfully to' + email);
		}).catch(function (e) {
			console.log(e);
		});
};

export { newUser, userget, addLike, removeLike, newMessage, forgetPassword };