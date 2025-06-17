import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResonse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User Not Found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Error Generating Tokens:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token")

    }

}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        return res.json({
            success: false, message: "User Already Exists"
        })
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select('username email fullName createdAt updatedAt');

    if (!createdUser) throw new ApiError(500, "Something Went Wrong Registering the User");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const options = { httpOnly: true, secure: true };
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, createdUser, "User Registered Sucessfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (!user) throw new ApiError(404, "User does not exist");

    const isPassValid = await user.isPasswordCorrect(password);

    if (!isPassValid) throw new ApiError(404, "Invalid User Credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select('username email fullName createdAt updatedAt');

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User Logged in Successfully"));
})



const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } }, { new: true })
    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User Logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorised Request");

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) throw new ApiError(401, "Invalid Refresh Token");

        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh Token is Expired or Used");

        const options = { httpOnly: true, secure: true }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token Refreshed"));

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");

    }
})

const getUserSession = asyncHandler(async (req, res) => {
    if (!req.user?._id) {
        return res.status(401).json(new ApiResponse(401, null, "User not authenticated"));
    }

    try {
        const user = await User.findById(req.user._id).select("username email fullName createdAt updatedAt");

        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, { user }, "User session retrieved successfully"));
    } catch (error) {
        console.error("Error retrieving user session:", error);
        throw new ApiError(500, "Internal server error while fetching user session");
    }
});


export { registerUser, loginUser, logoutUser, refreshAccessToken, getUserSession }