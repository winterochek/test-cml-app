import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore'
import { Visit, VisitData } from '../types'

const firebaseConfig = {
   apiKey: 'AIzaSyC624SPk1Ldu018rnxtDj7OZj0FhR0Ppmc',
   authDomain: 'chat-948de.firebaseapp.com',
   projectId: 'chat-948de',
   storageBucket: 'chat-948de.appspot.com',
   messagingSenderId: '441028405968',
   appId: '1:441028405968:web:7ab036f9f46fa098494cd5',
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

export async function getVisits() {
    const snapshot = await getDocs(query(collection(db, 'visits'), orderBy('timestamp')))
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    return data as Visit[]
}
