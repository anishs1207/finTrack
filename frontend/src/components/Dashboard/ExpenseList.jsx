import React, { useState, useEffect, useCallback } from 'react';
// import ExpenseTracker from './ExpenseTracker.jsx';
import { useNavigate } from "react-router-dom";

function ExpenseList({ fetchExpenses, expenses, setExpenses }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedExpense, setEditedExpense] = useState({});
    const navigate = useNavigate();
    const [newExpense, setNewExpense] = useState({
        expenseName: "",
        price: "",
        category: "",
        date: "",
    });

    const [sortField, setSortField] = useState(false);
    const [sortOrder, setSortOrder] = useState(null);

    const handleSort = (field) => {
        const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    const sortedExpenses = [...expenses].sort((a, b) => {
        if (!sortField) return 0;

        let valueA = a[sortField];
        let valueB = b[sortField];

        if (sortField === "date") {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
        } else if (sortField === "price") {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        } else {
            valueA = valueA.toString().toLowerCase();
            valueB = valueB.toString().toLowerCase();
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    const getSortIcon = (field) => {
        if (sortField === field) {
            return sortOrder === "asc" ? "▲" : "▼";
        }
        return "▲▼";
    };


    // Authentication Check
    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken');
    //     if (!token) {
    //         navigate('/login');
    //         setAuthenticated(false);
    //     } else {
    //         setAuthenticated(true);
    //     }
    // }, [navigate]);

    // Fetch Expenses
    // const fetchExpenses = useCallback(async () => {
    //     try {
    //         const response = await axiosInstance.get("/api/v1/expense/get-expenses", {
    //             headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    //         });
    //         setExpenses(response.data.data);
    //     } catch (error) {
    //         console.error("Error fetching expenses:", error);
    //     }
    // }, []);

    useEffect(() => {
        if (authenticated) fetchExpenses();
    }, [authenticated, fetchExpenses]);

    // Handle Input Change for New Expense
    const handleNewExpenseChange = (e) => {
        setNewExpense(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle Input Change for Edited Expense
    const handleEditedExpenseChange = (e) => {
        setEditedExpense(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle Edit Click
    const handleEditClick = (expense) => {
        setEditingIndex(expense._id);
        setEditedExpense({ ...expense });
    };

    // Update Expense
    const handleUpdateExpense = async () => {
        try {
            await axios.put(`/api/v1/expense/update-expense/${editedExpense._id}`, editedExpense, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });

            setEditingIndex(null);
            setEditedExpense({});
            fetchExpenses();
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    // Delete Expense
    const handleDeleteExpense = async (expenseId) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            await axios.delete(`/api/v1/expense/delete-expense/${expenseId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });

            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // Format Date Function
    function formatDateFromISO(isoDate) {
        return new Date(isoDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    return (
        <>
            <h2 className=" rounded p-4 bg-gray-800 text-3xl font-semibold mt-10 mb-6 text-center">Expense List</h2>
            <div className="flex justify-center w-full">
                <div className="flex overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                    <table className="min-w-full border-collapse table-auto text-center">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="px-4 py-2 text-lg font-medium">Expense Name</th>
                                <th className="px-4 py-2 text-lg font-medium " onClick={() => handleSort("price")}>Amount<span className={`ml-1 cursor-pointer ${sortField === "price" ? "text-white" : "text-gray-500"}`}>{getSortIcon("price")}</span></th>
                                <th className="px-4 py-2 text-lg font-medium" onClick={() => handleSort("category")}>Category<span className={`ml-1 cursor-pointer ${sortField === "category" ? "text-white" : "text-gray-500"}`}>{getSortIcon("category")}</span></th>
                                <th className="px-4 py-2 text-lg font-medium" onClick={() => handleSort("date")}>Date<span className={`ml-1 cursor-pointer ${sortField === "date" ? "text-white" : "text-gray-500"}`}>{getSortIcon("date")}</span></th>
                                <th className="px-4 py-2 text-lg font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedExpenses.length > 0 ? (
                                sortedExpenses.map((expense, index) => (
                                    <tr key={index} className="border-b border-gray-700 pt-0">
                                        {/* Expense Name */}
                                        <td className="px-4 py-2">
                                            {editingIndex === expense._id ? (
                                                <input
                                                    type="text"
                                                    value={editedExpense.expenseName}
                                                    name="expenseName"
                                                    onChange={handleEditedExpenseChange}
                                                    className="bg-gray-700 text-white px-2 py-1 rounded"
                                                />
                                            ) : (
                                                expense.expenseName
                                            )}
                                        </td>

                                        {/* Amount */}
                                        <td className=" m-0 px-4 py-2">
                                            {editingIndex === expense._id ? (
                                                <input
                                                    type="number"
                                                    value={editedExpense.price}
                                                    name="price"
                                                    onChange={handleEditedExpenseChange}
                                                    className="bg-gray-700 text-white px-2 py-1 rounded"
                                                />
                                            ) : (
                                                `₹${expense.price}`
                                            )}
                                        </td>

                                        <td className="px-4 py-2">
                                            {editingIndex === expense._id ? (
                                                <select
                                                    name="category"
                                                    value={editedExpense.category}
                                                    onChange={handleEditedExpenseChange}
                                                    className="m-0 bg-gray-700 text-white px-2 py-1 rounded"
                                                >
                                                    {["LIVING", "TRANSPORT", "FOOD", "HEALTH", "ENTERTAIN", "SAVE", "MISC"].map((category) => (
                                                        <option key={category} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                expense.category
                                            )}
                                        </td>


                                        {/* Date */}
                                        <td className="px-4 py-2">
                                            {editingIndex === expense._id ? (
                                                <input
                                                    type="date"
                                                    value={editedExpense.date}
                                                    name="date"
                                                    onChange={handleEditedExpenseChange}
                                                    className="m-0 bg-gray-700 text-white px-2 py-1 rounded"
                                                />
                                            ) : (
                                                formatDateFromISO(expense.date)
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className=" px-4 py-2">
                                            {editingIndex === expense._id ? (
                                                <button
                                                    className="cursor-pointer px-3 m-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                    onClick={handleUpdateExpense}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="cursor-pointer px-3 m-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    onClick={() => handleEditClick(expense)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                className="cursor-pointer px-3 py-1 m-1 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                                onClick={() => handleDeleteExpense(expense._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center px-4 py-2">No expenses found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ExpenseList;
