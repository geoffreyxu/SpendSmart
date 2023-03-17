import { db } from '../../firebase.config';
import "./Home.css";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const IncomeCollectionRef = collection(db, "income");
class IncomeDataService {
  addIncome = (newIncome) => {
    return addDoc(IncomeCollectionRef, newIncome);
  };

  updateIncome = (id, updatedIncome) => {
    const IncomeDoc = doc(db, "income", id);
    return updateDoc(IncomeDoc, updatedIncome);
  };

  deleteIncome = (id) => {
    const IncomeDoc = doc(db, "income", id);
    return deleteDoc(IncomeDoc);
  };

  getAllIncome = () => {
    return getDocs(IncomeCollectionRef);
  };

  getIncome = (id) => {
    const IncomeDoc = doc(db, "income", id);
    return getDoc(incomeDoc);
  };
}

export default new IncomeDataService();
