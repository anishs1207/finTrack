import { Router } from "express";
import {
    addExpense,
    getExpense,
    deleteExpenseById,
    getExpenseById,
    updateExpenseById
} from "../controllers/expenses.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/add-expense').post(verifyJWT, addExpense);
router.route('/get-expenses').get(verifyJWT, getExpense);
router.route('/get-expense/:id').get(verifyJWT, getExpenseById);
router.route('/delete-expense/:id').delete(verifyJWT, deleteExpenseById);
router.route('/update-expense/:id').put(verifyJWT, updateExpenseById);

export default router;
