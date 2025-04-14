import { useState } from 'react';
import axios from "axios";

function ExpenseTracker({ onExpenseAdded }) {  // Accept onExpenseAdded as a prop
    const [expenseName, setExpenseName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        if (!expenseName || !category || !price) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            const response = await axios.post('/api/v1/expense/add-expense', {
                expenseName,
                category,
                price: parseFloat(price),  // Convert price to a number
            });
            // Reset the form after submission
            setExpenseName('');
            setCategory('');
            setPrice('');

            // Refresh the expenses list in Dashboard
            if (onExpenseAdded) {
                onExpenseAdded();
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            // ('There was an error adding the expense.');
        }
    };

    return (
        <div className=" bg-gray-900 w-100 h-125 flex  items-top justify-center p-4">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-6 text-center">Expense Tracker</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="expenseName" className="block text-lg mb-2">Expense Name:</label>
                        <input
                            type="text"
                            name="expenseName"
                            placeholder="Momos Eating"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-lg mb-2">Category:</label>
                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="LIVING">LIVING</option>
                            <option value="TRANSPORT">TRANSPORT</option>
                            <option value="FOOD">FOOD</option>
                            <option value="HEALTH">HEALTH</option>
                            <option value="ENTERTAIN">ENTERTAIN</option>
                            <option value="SAVE">SAVE</option>
                            <option value="MISC">MISC</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-lg mb-2">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Expense
                        </button>


                    </div>
                </form>
            </div>
        </div>

    );
}

export default ExpenseTracker;
