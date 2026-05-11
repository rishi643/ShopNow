import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      // 🔥 Replace this with backend API later
      console.log("Form Data:", form);

      setTimeout(() => {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
        setLoading(false);
      }, 1000);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGE */}
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full h-[350px] object-cover rounded-xl shadow-md"
        />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

        </form>

      </div>

      {/* EXTRA INFO */}
      <div className="mt-12 text-center text-gray-600">

        <p>Email: rryiocjjcjc@gmail.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: Bangalore, India</p>

      </div>

    </div>
  );
}

export default Contact;