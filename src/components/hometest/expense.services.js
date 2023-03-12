import { db, auth } from '../../firebase.config';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";


const expenseCollectionRef = collection(db, "expenses");
class ExpenseDataService {
  addExpense = (newExpense) => {
    console.log("hey");
    return addDoc(expenseCollectionRef, newExpense);
  };

  updateExpense = (id, updatedExpense) => {
    const expenseDoc = doc(db, "expenses", id);
    return updateDoc(expenseDoc, updatedExpense);
  };

  deleteExpense = (id) => {
    const expenseDoc = doc(db, "expenses", id);
    return deleteDoc(expenseDoc);
  };

  getAllExpense = () => {
    return getDocs(expenseCollectionRef);
  };

  getExpense = (id) => {
    const expenseDoc = doc(db, "expenses", id);
    return getDoc(expenseDoc);
  };
  getExpenses = (id) => {
    return

  }
}

export default new ExpenseDataService();