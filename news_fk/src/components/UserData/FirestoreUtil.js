import {db} from '../UserAuthentication/firebase';

const userget = (uid) => {
    db.collection('users').doc(uid).get()
    .then(doc => {
        console.log(doc.data())
    })
      .catch(console.log('error'))
    }


const newUser = (uid, fname ,lname) => {
    db.collection('users').doc(uid).set({
        first_name: fname,
        last_name: lname
        },{merge : true})
      .then(console.log('done'))
      .catch(err => console.log(err))
    }
export {newUser , userget};