import { useState } from "react";

export default function FAQ() {
    const faqs = [
        { question: "What is FinTrack?", answer: "FinTrack is a personal finance app designed to help young individuals track their expenses and build smart financial habits." },
        { question: "Is FinTrack free to use?", answer: "Yes, FinTrack offers a free version with essential features. We also have premium plans for advanced tools." },
        { question: "How do I reset my password?", answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions." },
        { question: "Can I connect my bank account?", answer: "Yes, FinTrack allows you to securely link your bank account to track expenses automatically." },
        { question: "Is my data safe?", answer: "Absolutely! We use industry-standard encryption to protect your data and ensure your privacy." }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className=" bg-gray-800 border border-gray-700 rounded-lg p-4">
                            <button
                                className="cursor-pointer w-full text-left flex justify-between items-center text-lg font-semibold text-gray-300 hover:text-white"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className="text-gray-400 cursor-pointer">{openIndex === index ? "−" : "+"}</span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-3 text-gray-400">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
