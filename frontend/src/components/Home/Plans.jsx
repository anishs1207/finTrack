import React from 'react'
import PlanCard from './PlanCard.jsx'

function Plans() {
    return (

        <section className="bg-gray-900 text-white py-12 px-6 mt-0">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-8">Choose Your Plan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* { heading, desc, points, cost } */}
                    <PlanCard
                        heading="Free"
                        desc="Start tracking your finances today with limited features."
                        points={["Track Expenses", "Set Budgets", "Basic Reports"]}
                        cost={"$0"}
                        showGlow={true}
                    />

                    <PlanCard
                        heading="Pro"
                        desc="Unlock premium features for better control of your finances."
                        points={["Track Expenses", "Set Budgets", "Advanced Reports", "Investment Tracking"]}
                        cost={"$9.99"}
                        showGlow={false}
                    />

                    <PlanCard
                        heading="Enterprise"
                        desc="For businesses or advanced users who need extensive features."
                        points={["Track Expenses", "Set Budgets", "Advanced Reports", "Custom Dashboards", "Dedicated Support"]}
                        cost={"$29.99"}
                        showGlow={false}
                    />
                </div>
            </div>
        </section >
    )
}

export default Plans