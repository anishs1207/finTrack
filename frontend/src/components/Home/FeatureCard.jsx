import React from 'react';

function FeatureCard({ index, heading, desc, image_url }) {
    return (
        <div className="group relative bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 
                        hover:shadow-2xl hover:scale-105 hover:-rotate-1">

            <div className="bg-blue-600 text-white p-4 rounded-full w-12 h-12 flex items-center 
                            justify-center mb-4 text-xl font-bold">
                {index}
            </div>

            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={image_url}
                    alt="Feature"
                    className="w-full h-48 object-cover transition-transform duration-300 
                                                               group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-2 transition-colors group-hover:text-blue-400">{heading}</h3>
            <p className="text-gray-400">{desc}</p>
        </div>
    );
}

export default FeatureCard;
