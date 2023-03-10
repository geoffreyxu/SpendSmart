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


const budgetCollectionRef = collection(db, "budgets");
class BudgetDataService {
  addBudget = (newBudget) => {
    return addDoc(budgetCollectionRef, newBudget);
  };

  updateBudget = (id, updatedBudget) => {
    const budgetDoc = doc(db, "budgets", id);
    return updateDoc(budgetDoc, updatedBudget);
  };

  deleteBudget = (id) => {
    const budgetDoc = doc(db, "budgets", id);
    return deleteDoc(budgetDoc);
  };

  getAllBudgets = () => {
    return getDocs(budgetCollectionRef);
  };

  getBudget = (id) => {
    const budgetDoc = doc(db, "budgets", id);
    return getDoc(budgetDoc);
  };
}

export default new BudgetDataService();
