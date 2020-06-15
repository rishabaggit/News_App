/* eslint-disable camelcase */
import { db } from '../config/UserAuthentication/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

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
		var dt = new Date();
		var utcDate = dt.toString();
		utcDate = utcDate.slice(-utcDate.length, -31)
		const msg = {
			username: userData.first_name + ' ' + userData.last_name,
			message: message,
			email: uid,
			time: utcDate,
			image: (userData.imageURL ? userData.imageURL : null)
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

async function UpdateProfile(email: string, Update: any) {
	await db.collection('users').doc(email).update({
		first_name: (Update.first_name ? Update.first_name : ''),
		last_name: (Update.last_name ? Update.last_name : ''),
		profession: (Update.profession ? Update.profession : ''),
		bio: (Update.bio ? Update.bio : ''),
		imageURL: (Update.imageURL ? Update.imageURL : null)
	});
}
export { newUser, userget, addLike, removeLike, newMessage, forgetPassword, UpdateProfile };