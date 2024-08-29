import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { useGetUserInfo } from "./useGetUserInfo"

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([])
    const [transactionTotal, setTransactionTotal] = useState({
        balance:0.0,
        expense:0.0,
        income:0.0
    })
    const transactionsCollectionRef = collection(db, "transactions")
    const { userId } = useGetUserInfo()
    const getTransactions = async () => {
        let unsub;
        try {
            const queryTransactions = query(transactionsCollectionRef, where("userId" , "==", userId), orderBy("createdAt"))

        unsub = onSnapshot(queryTransactions, (snapshot) =>{
            let docs=[];
            let totalIncome = 0;
            let totalExpense = 0;
            let balance = 0;
            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                console.log("Fetched transaction:", { ...data, id });
                docs.push({...data, id })

                if(data.transactionType === "expense"){
                    totalExpense +=  Number(data.transactionAmount);
                }
                else{
                    totalIncome += Number(data.transactionAmount);
                }
                balance = totalIncome - totalExpense;
            })
            setTransactions(docs)
            setTransactionTotal({
                balance,
                expense: totalExpense,
                income: totalIncome
            })
        })

        } catch (err) {
            console.log(err)
        }
        return () => unsub() 
    }

    useEffect(() => {
        getTransactions()

    },[userId])


    return { transactions, transactionTotal }
}