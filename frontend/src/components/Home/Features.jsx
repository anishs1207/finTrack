import React from 'react';
import intro from "../../assets/intro.jpg";
import FeatureCard from "./FeatureCard.jsx"

function Features() {
    return (
        <div id="feature" className="bg-gray-900 text-white py-16 px-6 mb-0">
            <h2 className="text-3xl font-semibold text-center mb-12">Features</h2>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                <FeatureCard
                    index={1}
                    heading="Track Your Expenses Easily"
                    desc="Log your daily expenses effortlessly and keep an eye on where your money goes with a simple and intuitive interface."
                    image_url={intro}
                />

                <FeatureCard
                    index={2}
                    heading="Categorized Spending"
                    desc="Organize your expenses into categories like Food, Travel, Bills, and more, so you know exactly where you're spending the most."
                    image_url={intro}
                />

                <FeatureCard
                    index={3}
                    heading="Monthly Budget Insights"
                    desc="Set a monthly budget and track your progress in real time to avoid overspending and build better financial habits."
                    image_url={intro}
                />

            </div>
        </div>
    );
}

export default Features;
