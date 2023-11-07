import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, query } from 'firebase/firestore'
import { VisitData } from '../types'

const firebaseConfig = {
   apiKey: 'AIzaSyBesU-tHkXHCcqYIOgvWRBfLbVTUzcoDdQ',
   authDomain: 'test-cml-team.firebaseapp.com',
   projectId: 'test-cml-team',
   storageBucket: 'test-cml-team.appspot.com',
   messagingSenderId: '180158264697',
   appId: '1:180158264697:web:1f334e6b2898b017872ba8',
   measurementId: 'G-Q569WRR2V8',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

export async function createVisit(visitData: VisitData) {
   const docRef = await addDoc(collection(db, 'visits'), visitData)
   console.log('Document written with ID: ', docRef.id)
}

export async function deleteAllVisits() {
   const collectionRef = collection(db, 'visits')
   const documentsQuery = query(collectionRef)

   const querySnapshot = await getDocs(documentsQuery)

   querySnapshot.forEach(doc => {
      deleteDoc(doc.ref)
   })
}
