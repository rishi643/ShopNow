import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap md:grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">ShopNow</h2>
          <p className="text-sm">
            Building modern shopping experiences with clean design and smooth performance.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-medium mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Men</li>
            <li className="hover:text-white cursor-pointer">Women</li>
            <li className="hover:text-white cursor-pointer">Kids</li>
            <li className="hover:text-white cursor-pointer">Accessories</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-medium mb-3">Contact</h3>
          <p className="text-sm">Email: rryiocjjcjc@gmail.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} ShopNow All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;