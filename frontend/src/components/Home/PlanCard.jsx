import React from 'react';

function PlanCard({ heading, desc, points, cost, showGlow }) {
    return (
        <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 group overflow-hidden">
            {/* Gradient background effect on hover */}

            <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">{heading}</h3>
            <p className="text-gray-400 mb-4">{desc}</p>

            <ul className="text-gray-300 mb-6 space-y-2">
                {points.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="text-blue-400">✔</span> {point}
                    </li>
                ))}
            </ul>

            <p className="text-3xl font-bold mb-6 text-white">{cost} / month</p>

            {showGlow ? <a
                href="/register"
                className="relative inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-110 animate-glow"
            >
                Get Started
                <span className="absolute inset-0 bg-blue-500 opacity-50 blur-lg scale-95 hover:opacity-70 transition-all duration-300"></span>
            </a> : <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-110 duration-300">
                Get Started
            </button>}



        </div>
    );
}

export default PlanCard;
