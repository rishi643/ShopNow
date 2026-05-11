import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10">
        About Us
      </h1>

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <img
          src={assets.about_img}
          alt="About"
          className="w-full h-[350px] object-cover rounded-xl shadow-md"
        />

        {/* TEXT */}
        <div className="flex flex-col gap-4 text-gray-600">
          <p>
            We are committed to delivering high-quality fashion products that
            combine style, comfort, and affordability. Our goal is to make
            online shopping simple, enjoyable, and reliable.
          </p>

          <p>
            From trendy collections to everyday essentials, we carefully curate
            our products to match modern lifestyles. Every item is selected
            keeping quality and customer satisfaction in mind.
          </p>

          <p>
            Our platform is designed to give you a smooth shopping experience,
            from browsing products to placing orders and tracking deliveries.
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="mt-14">

        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Quality Products</h3>
            <p className="text-sm text-gray-500">
              Carefully selected items to ensure the best quality and durability.
            </p>
          </div>

          <div className="border p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Easy Shopping</h3>
            <p className="text-sm text-gray-500">
              User-friendly interface with a smooth and hassle-free experience.
            </p>
          </div>

          <div className="border p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-500">
              Quick and reliable shipping with easy tracking options.
            </p>
          </div>

        </div>

      </div>

      {/* EXTRA SECTION */}
      <div className="mt-14 text-center text-gray-600 max-w-2xl mx-auto">
        <p>
          We continuously strive to improve and bring better services to our
          customers. Your trust and satisfaction are what drive us forward.
        </p>
      </div>

    </div>
  );
}

export default About;