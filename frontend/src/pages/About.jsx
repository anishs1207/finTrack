import { motion } from "framer-motion";
import intro from "../assets/intro.jpg";

function About() {
    return (
        <section className="bg-gray-900 text-white py-20 px-6 overflow-hidden">
            <div className="max-w-screen-xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white bg-clip-text mb-4">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Helping young individuals take charge of their financial future with smart expense tracking.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div className="mt-10 lg:mt-0 lg:w-1/2 flex m-0">
                        <img
                            src={intro}
                            alt="Finance Illustration"
                            className="w-100 h-100 object-cover rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-float"
                        />
                    </div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-300 mb-6">
                            We aim to make personal finance simple, engaging, and accessible for young adults and students.
                            Our platform helps users track expenses, set savings goals, and build financial literacy with ease.
                        </p>

                        {/* Core Values Section */}
                        <div className="grid grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 bg-gray-800 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-blue-400">Transparency</h3>
                                <p className="text-gray-400 text-sm">We ensure clear and honest financial tracking for everyone.</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 bg-gray-800 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-purple-400">Empowerment</h3>
                                <p className="text-gray-400 text-sm">Providing the tools to make informed financial decisions.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mt-16"
                >
                    <h2 className="text-white text-4xl font-bold mb-4 bg-clip-text ">
                        Join Us on This Journey!
                    </h2>
                    <p className="text-gray-300 max-w-xl mx-auto mb-6">
                        Take the first step toward financial freedom. Start tracking your expenses today.
                    </p>
                    <a
                        href="/register"
                        className="relative inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-110 animate-glow"
                    >
                        Get Started
                        <span className="absolute inset-0 bg-blue-500 opacity-50 blur-lg scale-95 hover:opacity-70 transition-all duration-300"></span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
