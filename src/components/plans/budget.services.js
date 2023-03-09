
import "./Plans.css";
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
/*
class BudgetDataService {
  addBudget = (newBudget) => {
    return addDoc(budgetCollectionRef, newBudget);
  };
*/

class BudgetDataService {
    addBudget = (newBudget) => {
      const user = auth.currentUser;
      newBudget.userId = user.uid;
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
/*
  getAllBudgets = () => {
    return getDocs(budgetCollectionRef);
  };
*/

/*
  getBudget = (id) => {
    const budgetDoc = doc(db, "budgets", id);
    return getDoc(budgetDoc);
  };
}
*/
getAllBudgets = () => {
    const user = auth.currentUser;
    const query = user ? queryByUser(budgetCollectionRef, user.uid) : budgetCollectionRef;
    return getDocs(query);

  };

  getBudget = (id) => {
    const user = auth.currentUser;
    const budgetDoc = doc(db, "budgets", id);
    return getDoc(budgetDoc).then((doc) => {
      if (doc.exists() && doc.data().userId === user.uid) {
        return doc;
      } else {
        throw new Error("Budget not found or not authorized to access.");
      }
    });
  };
}


function queryByUser(collectionRef, userId) {
    return query(collectionRef, where("userId", "==", userId));
}

export default new BudgetDataService();