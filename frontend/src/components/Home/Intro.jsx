import React from "react";
import intro from "../../assets/intro.jpg";

function Intro() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h bg-gray-900 text-white px-6 lg:px-20 py-12 animate-fadeIn">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-scaleIn">
                    Welcome to <span className="text-blue-400">FinTrack!</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-lg mb-6 animate-slideIn">
                    Track your expenses, save smartly, and take control of your finances.
                </p>
                <a
                    href="/register"
                    className="relative inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-110 animate-glow"
                >
                    Get Started
                    <span className="absolute inset-0 bg-blue-500 opacity-50 blur-lg scale-95 hover:opacity-70 transition-all duration-300"></span>
                </a>
            </div>

            {/* Image Section */}
            <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center m-0">
                <img
                    src={intro}
                    alt="Finance Illustration"
                    className="w-100 h-100 object-cover rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-float"
                />
            </div>
        </div>
    );
}

export default Intro;
