import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6 mt-0">
            <div className="justify-center max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Contact Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <p className="text-gray-400">Feel free to reach out to us!</p>
                    <ul className="mt-4 text-gray-300">
                        <li>Email: anishs1207@gmail.com</li>
                        <li>Phone: 931 043 5866</li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Socials</h3>
                    <div className="flex space-x-6">
                        <a href="https://www.instagram.com/anishsab1207" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl hover:text-gray-400 transition-colors" />
                        </a>
                        <a href="https://www.linkedin.com/in/anish-sabharwal-a113a9307" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-2xl hover:text-gray-400 transition-colors" />
                        </a>
                        <a href="https://www.twitter.com/anishs1207" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-2xl hover:text-gray-400 transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="text-gray-300">
                        <li><a href="/about" className="hover:text-gray-400 transition-colors">About Us</a></li>
                        <li><a href="" className="hover:text-gray-400 transition-colors">Features</a></li>
                        <li><a href="/home#faq" className="hover:text-gray-400 transition-colors">FAQs</a></li>
                        <li><a href="/contact-us" className="hover:text-gray-400 transition-colors">Contact</a></li>
                    </ul>
                </div>


                {/* Mission Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-gray-300">
                        Empowering young individuals with smart financial habits to secure their future.
                    </p>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="text-center mt-12 text-gray-400">
                <p>&copy; 2025 FinTrack. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
