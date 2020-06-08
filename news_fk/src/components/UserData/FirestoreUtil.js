import {db} from '../UserAuthentication/firebase';
import firebase from 'firebase';
async function userget(uid){
	let res  = await db.collection('users').doc(uid).get();
	return res.data();
}

const newUser = (uid, fname ,lname) => {
	db.collection('users').doc(uid).set({
		first_name: fname,
		last_name: lname
	},{merge : true})
		.then(console.log('done'))
		.catch(err => console.log(err));
};
const addLike = (uid, url) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayUnion(url)
	})
		.then(console.log('done'))
		.catch(err => console.log(err));
};
const removeLike = (uid, url) => {
	db.collection('users').doc(uid).update({
		liked: firebase.firestore.FieldValue.arrayRemove(url)
	})
		.then(console.log('done'))
		.catch(err => console.log(err));
};
export {newUser , userget , addLike , removeLike};