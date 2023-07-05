import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    name: "",
    price: "",
    description: "",
    previewImage: "",
    previewImage1: "",
    previewImage2: "",
    previewImage3: "",
    previewImage4: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    if (!values.address) {
      newErrors.address = "Address is required";
    }

    if (!values.city) {
      newErrors.city = "City is required";
    }

    if (!values.state) {
      newErrors.state = "State is required";
    }

    if (!values.country) {
      newErrors.country = "Country is required";
    }

    if (!values.name) {
      newErrors.name = "Name is required";
    }

    if (!values.price) {
      newErrors.price = "Price is required";
    }

    if (!values.description || values.description.length < 30) {
      newErrors.description = "Description needs a minimum of 30 characters";
    }

    if (!values.previewImage) {
      newErrors.previewImage = "Preview image is required.";
    } else if (!/\.(jpg|jpeg|png)$/.test(values.previewImage)) {
      newErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      values.previewImage1 &&
      !/\.(jpg|jpeg|png)$/.test(values.previewImage1)
    ) {
      newErrors.previewImage1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      values.previewImage2 &&
      !/\.(jpg|jpeg|png)$/.test(values.previewImage2)
    ) {
      newErrors.previewImage2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      values.previewImage3 &&
      !/\.(jpg|jpeg|png)$/.test(values.previewImage3)
    ) {
      newErrors.previewImage3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      values.previewImage4 &&
      !/\.(jpg|jpeg|png)$/.test(values.previewImage4)
    ) {
      newErrors.previewImage4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    setErrors(newErrors);
  }, [values]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const res = await dispatch(createSpot(values));
      if ("errors" in res) {
        // handle error here, update your form errors
        setErrors(res.errors);
      } else {
        //redirecting to the new spot page
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a new Spot</h1>

      <div className="section">
        <h2>Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <input
          name="address"
          value={values.address}
          onChange={handleInputChange}
          placeholder="Street Address"
        />
        {errors.address && <p>{errors.address}</p>}

        <input
          name="city"
          value={values.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        {errors.city && <p>{errors.city}</p>}

        <input
          name="state"
          value={values.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        {errors.state && <p>{errors.state}</p>}

        <input
          name="country"
          value={values.country}
          onChange={handleInputChange}
          placeholder="Country"
        />
        {errors.country && <p>{errors.country}</p>}

        <input
          name="lat"
          value={values.lat}
          onChange={handleInputChange}
          placeholder="Latitude"
        />
        {errors.lat && <p>{errors.lat}</p>}

        <input
          name="lng"
          value={values.lng}
          onChange={handleInputChange}
          placeholder="Longitude"
        />
        {errors.lng && <p>{errors.lng}</p>}
      </div>
      <div className="section">
        <h2>Create a title for your spot</h2>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>

        <input
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="Name of your spot"
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div className="section">
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>

        <input
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="Price per night (USD)"
        />
        {errors.price && <p>{errors.price}</p>}
      </div>
      <div className="section">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>

        <textarea
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="Describe your place to guests"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div className="section">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          name="previewImage"
          value={values.previewImage}
          onChange={handleInputChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage && <p>{errors.previewImage}</p>}
        <input
          name="previewImage1"
          value={values.previewImage1}
          onChange={handleInputChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage1 && <p>{errors.previewImage1}</p>}
        <input
          name="previewImage2"
          value={values.previewImage2}
          onChange={handleInputChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage2 && <p>{errors.previewImage2}</p>}
        <input
          name="previewImage3"
          value={values.previewImage3}
          onChange={handleInputChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage3 && <p>{errors.previewImage3}</p>}
        <input
          name="previewImage4"
          value={values.previewImage4}
          onChange={handleInputChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImage4 && <p>{errors.previewImage4}</p>}
      </div>
      <button type="submit">Create Spot</button>
    </form>
  );
};

export default CreateSpotForm;
