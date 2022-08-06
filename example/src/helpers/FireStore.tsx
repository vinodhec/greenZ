import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyCVR1UKR_pPs7CXeRWHmmb_UmYJEu0T8IU",
  authDomain: "veginventory.firebaseapp.com",
  projectId: "veginventory",
  storageBucket: "veginventory.appspot.com",
  messagingSenderId: "1020396714134",
  appId: "1:1020396714134:web:1741bd9daeaaa224d12ab7",
  measurementId: "G-BCQCC49JEK"
};

const app  = initializeApp(firebaseConfig);
const db = getFirestore(app);


import { collection, addDoc, getFirestore, getDocs, updateDoc, doc } from "firebase/firestore"; 


export class FireStore{
static updateDocument(collectionName:string,data: any) {
    const ref = doc(db, collectionName, data.id);

  return updateDoc(ref, data)
}

constructor(params) {

}
static addDocument(collectionName:string, doc:any){

console.log(collectionName,doc);
    return addDoc(collection(db, collectionName), doc);
}

static getDocuments(collectionName){
    return getDocs(collection(db, collectionName))
}
}