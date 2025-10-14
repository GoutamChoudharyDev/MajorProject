import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            🏡 <span className="text-yellow-500">E</span>asy
            <span className="text-red-500">R</span>ent
          </h2>
          <p className="text-gray-400 text-sm">
            Your trusted partner in finding the perfect home to rent. Comfort, convenience, and style—just a click away.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/listings" className="hover:text-yellow-400">Listings</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            {/* <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: <a href="mailto:rc.goutam.choudhary.com" className="hover:text-yellow-400">rc.goutam.choudhary@gmail.com</a></li>
            <li>Phone: <a href="tel:+919691729636" className="hover:text-yellow-400">+91 9691729636</a></li>
            <li>Address: Indore, MP, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 hover:bg-yellow-500 p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-yellow-500 p-2 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-yellow-500 p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-yellow-500 p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} EasyRent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
