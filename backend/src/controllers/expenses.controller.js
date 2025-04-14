import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResonse.js";
import { Expense } from "../models/expenses.models.js";
import jwt from "jsonwebtoken";


const addExpense = asyncHandler(async (req, res) => {
    const { expenseName, price, category } = req.body;

    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized! Please log in.");
    }

    if ([expenseName, price, category].some((field) => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }


    const expensesPresent = await Expense.findOne({ expenseName });

    if (expensesPresent) throw new ApiError(409, "Expense with that name already exists");

    //match the user

    const expense = await Expense.create({
        expenseName,
        price,
        category,
        date: new Date(),
        owner: req.user._id,
    })

    if (!expense) {
        throw new ApiError(500, "Something went wrong while creating the expense");
    }

    // const createdExpense = await Expense.findById(user._id);
    // //get all the fields
    // console.log(createdExpense);

    return res.status(201).json(new ApiResponse(201, expense, "Expense Added Successfully"));
});


const getExpense = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized! Please log in.");
    }
    const expenses = await Expense.find({ owner: req.user._id });
    return res.status(200).json(new ApiResponse(200, expenses, "Expenses fetched Successfully"));
})

//by searching
const getExpenseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Expense ID is required");

    const expense = await Expense.findOne({ _id: id, owner: req.user._id });

    if (!expense) throw new ApiError(404, "Expense Not Found");

    return res.status(200).json(new ApiResponse(200, expense, "Expense fetched successfully!"));
});

//addd the field for updating via expenseName, price, category

const deleteExpenseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Expense ID is required");

    const expense = await Expense.findOneAndDelete({ _id: id, owner: req.user._id });

    if (!expense) throw new ApiError(404, "Expense Not Found");

    return res.status(200).json(new ApiResponse(200, expense, "Expense deleted successfully!"));
});


const updateExpenseById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { expenseName, price, category, date } = req.body;

    if (!expenseName || !price || !category || !date) {
        throw new ApiError(400, "All fields are required for updating");
    }

    const expense = await Expense.findOne({ _id: id, owner: req.user._id });

    if (!expense) throw new ApiError(404, "Expense Not Found");

    // Update fields
    expense.expenseName = expenseName;
    expense.price = price;
    expense.category = category;
    expense.date = date;

    const updatedExpense = await expense.save();

    return res.status(200).json(new ApiResponse(200, updatedExpense, "Expense updated successfully"));
});



export { addExpense, getExpense, getExpenseById, deleteExpenseById, updateExpenseById };

