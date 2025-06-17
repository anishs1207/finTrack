import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
             import.meta.env.VITE_EMAILJS_SERVICE_ID,
             import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            e.target,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                alert("Message Sent Successfully!");
                setForm({ name: "", email: "", message: "" });
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("Failed to send message.");
            });
    };

    return (
        <section className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-400">
                        Got questions? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Contact Form */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                        <form onSubmit={sendEmail}>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                                    placeholder="Your Message"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all w-full"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-gray-400 mb-4">
                            Whether you have questions or need assistance, we're here to help!
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-blue-500 text-xl" />
                                <span className="text-gray-300">+91 931 043 5866</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-500 text-xl" />
                                <span className="text-gray-300">anishs1207@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                                <span className="text-gray-300">New Delhi, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
