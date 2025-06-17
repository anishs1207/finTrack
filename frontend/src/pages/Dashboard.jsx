import { useState, useCallback, useEffect } from 'react';
import { ExpenseTracker, ExpenseList } from "../components/Dashboard";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });

                if (data?.data?.user) {
                    setUser(data.data.user);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Session check failed:", error);
                navigate('/login');
            }
        };

        checkSession();
    }, []);

    const fetchExpenses = useCallback(async () => {
        try {
            const response = await axios.get("/api/v1/expense/get-expenses");
            setExpenses(response.data.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);


    useEffect(() => {
        if (user) {
            fetchExpenses();
        }
    }, [user, fetchExpenses]);

    return (
        <>
            <div className="h-full w-full lg:flex justify-center bg-gray-900 text-white min-h-screen p-6 ">
                <div className="flex sm:justify-center">
                    <ExpenseTracker onExpenseAdded={fetchExpenses} />
                </div>
                <div>
                    <ExpenseList
                        fetchExpenses={fetchExpenses}
                        expenses={expenses}
                        setExpenses={setExpenses} />
                </div>
            </div >
        </>
    );
}

export default Dashboard;
