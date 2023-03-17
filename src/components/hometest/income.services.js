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


const incomeCollectionRef = collection(db, "incomes");
class IncomeDataService {
  addIncome = (newIncome) => {
    return addDoc(incomeCollectionRef, newIncome);
  };

  updateIncome = (id, updatedIncome) => {
    const incomeDoc = doc(db, "incomes", id);
    return updateDoc(incomeDoc, updatedIncome);
  };

  deleteIncome = (id) => {
    const incomeDoc = doc(db, "incomes", id);
    return deleteDoc(incomeDoc);
  };

  getAllIncome = () => {
    return getDocs(incomeCollectionRef);
  };

  getIncome = (id) => {
    const incomeDoc = doc(db, "incomes", id);
    return getDoc(incomeDoc);
  };
}

export default new IncomeDataService();