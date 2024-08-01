"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@utils/uploadthing';
import { useAppContext } from "@mycontext/AppContext";

const AddProperty = ({defValues, isupdate, propId}) => {
  const router = useRouter();

  const context = useAppContext();
  const isSuperAdmin = (context.Luser.user.role === "superadmin");


  const [property, setProperty] = useState(defValues || {
    
        name: '',
        description: '',
        price: '',
        size: '',
        location: '',
        tourLink: '',
        amenities: [],
        assignedTo : "",
        images: ["", "", ""]
      
  });

  const formatIndianCurrency = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  const [amenity, setAmenity] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file, idx) => {
    setProperty(prev => ({ ...prev, images: prev.images.map((img, i) => i === idx ? file : img) }));
  };
  

  const handleImageDelete = (idx) => {
    setProperty(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === idx ? '' : img) // Set empty string or handle as needed
    }));
  };

  const handleAmenityAdd = () => {
    if (amenity && !property.amenities.includes(amenity)) {
      setProperty(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
      setAmenity("");
    }
  };

  const handleAmenityRemove = (amenityToRemove) => {
    setProperty(prev => ({ ...prev, amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(property).forEach(key => {
      if (key === 'images') {
        property[key].forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, property[key]);
      }
    });
    if (!isupdate)
        await context.addProperty(property);
    else
        await context.UpdateProperty(property, propId);
    
    //console.log(property);

    router.push("/admin");
    
  };

  useEffect(() => {
    const validateForm = () => {
      const { name, description, price, size, location, tourLink, images } = property;
      return (
        name &&
        description &&
        price &&
        size &&
        location && 
        tourLink &&
        images.some(image => image !== "")
      );
    };

    setIsFormValid(validateForm());
    //console.log(property)
  }, [property]);

  useEffect(() => {
    setProperty(prev => ({
      ...defValues,
      images: [...(defValues.images || []), '', '', ''].slice(0, 3)  // Ensure three slots are there
    }));
  }, [defValues]);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4 rounded-2xl">
      <div className="bg-white p-8 shadow-lg w-full max-w-7xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">{isupdate ? "Update " : "Add "}
        Property</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Name</label>
              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                placeholder="Property Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                placeholder="Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tour Link</label>
              <input
                name="tourLink"
                value={property.tourLink}
                onChange={handleChange}
                placeholder="Tour Link"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                placeholder="Price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input
                type="number"
                name="size"
                value={property.size}
                onChange={handleChange}
                placeholder="Size"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                placeholder="Location"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {property.images.map((image, idx) => (
    <div key={idx} className="relative">
      {image ? (
        <>
          <img src={image} alt={`Property Image ${idx + 1}`} className="mt-2 w-full h-32 object-cover rounded-md" />
          <button
            type="button"
            onClick={() => handleImageDelete(idx)}
            className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2.5 rounded-xl"
          >
            &times;
          </button>
        </>
      ) : (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            handleImageChange(res[0].url, idx);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  ))}
</div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
                placeholder="Add Amenity"
                className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAmenityAdd}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl"
              >
                Add
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="inline-flex items-center pl-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleAmenityRemove(amenity)}
                    className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium text-indigo-700 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          {isSuperAdmin ? (
          <div>
              <label className="block text-sm font-medium text-gray-700">Assign To</label>
              <input
                type="text"
                name="assignedTo"
                value={property.assignedTo}
                onChange={handleChange}
                placeholder="Property Admin Username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            ) : (<></>)}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
                {isupdate ? "Update " : "Add "}
               Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
