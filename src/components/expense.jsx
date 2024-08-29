import React from 'react';
import { useAddTransaction } from '../hooks/useAddTransaction';
import { useState } from 'react';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
export const Expense = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions , transactionTotal} = useGetTransactions();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const {balance , expense, income} = transactionTotal
    const signUserOut = async () => {
        try {
          await signOut(auth);
          localStorage.clear();
          navigate("/");
        } catch (err) {
          console.error(err);
        }
      };
    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center p-4">
            <div className="w-full max-w-3xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6 my-8 flex justify-between items-start">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Expense Tracker</h1>
                    <div className="bg-gray-100 rounded-lg p-4 mb-6 shadow-inner">
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Your Balance</h3>
                            <h2 className="text-3xl font-bold text-green-600">Rs {balance}</h2>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-600">Income</h3>
                                <h2 className="text-2xl font-bold text-green-500">Rs {income}</h2>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-600">Expense</h3>
                                <h2 className="text-2xl font-bold text-red-500">Rs {expense}</h2>
                            </div>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description..."
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <div className="flex items-center justify-around">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    id="expense"
                                    value="expense"
                                    className="form-radio text-red-600"
                                    checked={transactionType === "expense"}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                />
                                <span className="ml-2 text-gray-700">Expense</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    id="income"
                                    value="income"
                                    className="form-radio text-green-600"
                                    checked={transactionType === "income"}
                                    onChange={(e) => setTransactionType(e.target.value)}
                                />
                                <span className="ml-2 text-gray-700">Income</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                        >
                            Add Transaction
                        </button>
                    </form>
                </div>
                
                <div className="ml-6 flex flex-col items-center">
                    <img
                        src={profilePhoto}
                        alt="User Profile"
                        className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                    />
                    <span className="text-gray-800 text-xl font-semibold mt-2">{name}</span>
                    <button
  className="sign-out-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  onClick={signUserOut}
>
  Sign Out
</button>

                </div>
            </div>

            <div className="w-full max-w-3xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Transactions</h1>
                <ul className="space-y-4">
                    {transactions.map((transaction, index) => {
                        const { description, transactionAmount, transactionType } = transaction;
                        return (
                            <li
                                key={index}
                                className={`p-4 rounded-lg shadow ${
                                    transactionType === "expense" ? "bg-red-100" : "bg-green-100"
                                }`}
                            >
                                <h4 className="text-lg font-medium text-gray-800">{description}</h4>
                                <p className={`text-xl font-bold ${transactionType === "expense" ? "text-red-600" : "text-green-600"}`}>
                                    Rs {transactionAmount} - {transactionType}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
