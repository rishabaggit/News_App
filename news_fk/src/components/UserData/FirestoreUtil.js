import {db} from '../UserAuthentication/firebase';

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
      .catch(err => console.log(err))
    }
export {newUser , userget};