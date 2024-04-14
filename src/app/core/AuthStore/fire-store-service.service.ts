import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, deleteDoc, query } from "firebase/firestore";
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  db: Firestore;

  constructor(private router: Router, private authService: AuthService) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: any) {
    try {
      const uid = this.authService.getUid();
      const docRef = await addDoc(collection(this.db, `users/${uid}/codesamples`), {
        ...snippet,
        by: uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("error while creating");
    }
  }

  async getAllSnippet() {
    let result: any[] = []
    const uid=window.localStorage.getItem('uid')
    const querySnapshot = await getDocs(collection(this.db, `users/${uid}/codesamples`));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    });
    return result
  }

  async getSnippetById(docId: string) {
    const uid = this.authService.getUid();
    const docRef = doc(this.db, `users/${uid}/codesamples`, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return {
        id: "1",
        title: "not found",
        code: "not found"
      };
    }
  }

  async deleteSnippet(docId: string) {
    try {
      const uid = this.authService.getUid();
      await deleteDoc(doc(this.db, `users/${uid}/codesamples`, docId));
      console.log("Document deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting document: ", error);
      return false;
    }
  }

  async editSnippet(docId: string, updatedSnippet: any) {
    try {
      const uid = this.authService.getUid();
      const docRef = doc(this.db, `users/${uid}/codesamples`, docId);
      
      await setDoc(docRef, updatedSnippet, { merge: true });

      console.log("Document edited successfully");
      return true;
    } catch (error) {
      console.error("Error editing document: ", error);
      return false;
    }
  }

}

