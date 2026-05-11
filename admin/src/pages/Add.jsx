import React, { useState, useContext } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { backendUrl } from '../App';
import { useEffect } from 'react';


function Add() {


    let [form, setform] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        bestseller: false,
        sizes: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    })





    function handleChange(event) {



        if (event.target.name.includes("image")) {

            setform(prev => { return { ...prev, [event.target.name]: event.target.files[0] } });

        } else if (event.target.name.includes("sizes")) {
            let array = [];
            console.log(typeof (event.target.value));

            for (let i of event.target.value) {
                if (!array.includes(i)) {
                    if (i == 'S' || i == 'M' || i == 'L') {
                        array.push(i);
                    }
                }
            }

            setform(prev => { return { ...prev, [event.target.name]: array } });
        } else if (event.target.name.includes("bestseller")) {
            setform(prev => { return { ...prev, [event.target.name]: event.target.checked } });
        }
        else {
            setform(prev => { return { ...prev, [event.target.name]: event.target.value } });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token") || "";

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                let value = form[key];

                if (key == "sizes") {
                    value = JSON.stringify(value);
                }
                // Skip null/empty values
                if (value !== null && value !== "") {
                    formData.append(key, value);
                }
            });

            console.log([...formData.entries()]);

            const response = await axios.post(
                `${backendUrl}/api/product/add`,
                formData,
                {
                    headers: { token: token } // DON'T set Content-Type manually
                }
            );

            if (response.data.success) {
                toast.success(response.data.result);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">

                <div>
                    <label>Enter Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label>Enter 4 Product Image</label>
                    <input
                        type="file"
                        name="image1"
                        onChange={handleChange}
                    />
                    {form.image1 instanceof File && (
                        <img src={URL.createObjectURL(form.image1)} alt="" />
                    )}

                    <input
                        type="file"
                        name="image2"
                        onChange={handleChange}
                    />
                    {form.image2 instanceof File && (
                        <img src={URL.createObjectURL(form.image2)} alt="" />
                    )}
                    <input
                        type="file"
                        name="image3"
                        onChange={handleChange}
                    />
                    {form.image3 instanceof File && (
                        <img src={URL.createObjectURL(form.image3)} alt="" />
                    )}
                    <input
                        type="file"
                        name="image4"
                        onChange={handleChange}
                    />
                    {form.image4 instanceof File && (
                        <img src={URL.createObjectURL(form.image4)} alt="" />
                    )}
                </div>

                <div>
                    <label>Enter Product Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Enter Product Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <label>Select Category</label>
                    <div className="flex gap-4">
                        {["Man", "Woman", "Kids"].map(item => (
                            <label key={item}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={item}
                                    onChange={handleChange}
                                /> {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* SUBCATEGORY */}

                <div>
                    <label>Select SubCategory</label>
                    <div className="flex gap-4">
                        {["TopWear", "BottomWear"].map(item => (
                            <label key={item}>
                                <input
                                    type="radio"
                                    name="subCategory"
                                    value={item}
                                    onChange={handleChange}
                                /> {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* SIZE */}
                <div>
                    <label>Select Size</label>
                    <div className="w-80 p-2 flex flex-col gap-4">
                        <label htmlFor="">Write S , L, M IN CAPITAL
                            LETTERS SEPERATED BY COMMA i.e.- S,M,L</label>
                        <input onChange={handleChange} name="sizes" className="border" type="text" />
                    </div>
                </div>
                <div className="flex gap-2 items-baseline h-10">
                    <label>Add to BestSeller</label>
                    <input name="bestseller" onChange={handleChange} className="items-center" type="checkbox" />
                </div>

                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Add