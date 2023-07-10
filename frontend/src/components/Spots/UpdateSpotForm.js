import { useParams } from 'react-router-dom';
import React, {useState, useEffect, } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchDetailedSpot, updateSpot } from '../../store/spots';

const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  const spot = useSelector((state) => state.spots.single);
  // useEffect(() => {
  //   dispatch(fetchDetailedSpot(spotId));
  // }, [dispatch, spotId]);

  // console.log(spot)

  // const [values, setValues] = useState({
  //   address: spot.address,
  //   city: spot.city,
  //   state: spot.state,
  //   country: spot.country,
  //   lat: spot.lat,
  //   lng: spot.lng,
  //   name: spot.name,
  //   price: spot.price,
  //   description: spot.description,
  // });

const [isLoading, setIsLoading] = useState(true);
const [values, setValues] = useState({
  address: '',
  city: '',
  state: '',
  country: '',
  lat: '',
  lng: '',
  name: '',
  price: '',
  description: '',
});

useEffect(() => {
  const fetchData = async () => {
    await dispatch(fetchDetailedSpot(spotId));
    setIsLoading(false);
  };
  fetchData();
}, [dispatch, spotId]);

// Initializing state after data is fetched
useEffect(() => {
  if (spot) {
    setValues({
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      price: spot.price,
      description: spot.description,
    });
    setIsLoading(false);
  }
}, [spot]);

  const [errors, setErrors] = useState({});

const getErrors = () =>{

    const newErrors = {};

    if (!values.country) {
      newErrors.country = "Country is required";
    }
    if (!values.address) {
      newErrors.address = "Address is required";
    }

    if (!values.city) {
      newErrors.city = "City is required";
    }

    if (!values.state) {
      newErrors.state = "State is required";
    }

    if (!values.lat) {
      newErrors.lat = "Latitude is required";
    }
    if (!values.lng) {
      newErrors.lng = "Longitude is required";
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

    //   setErrors(newErrors);
  // }, [values]);
  // changed to return newError
  return newErrors
}

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prevValues) => ({ ...prevValues, [name]: value }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
        if (name === "previewSelection") {
            return {
                ...prevValues,
                [name]: value,
            };
        }
        return { ...prevValues, [name]: value };
    });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = getErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (Object.keys(errors).length === 0) {
      const {
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price,
      } = values;

      const spot = {
        id: spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      };

      const newSpot = await dispatch(updateSpot(spot));
      if (newSpot && newSpot.errors) {
        setErrors(newSpot.errors);
      }else{

        history.push(`/spots/${newSpot.id}`);
      }

    }

  };
    if (!spotId) return null;

    if (isLoading) {
      return <div>Loading...</div>;
    }
  return (

    <form onSubmit={handleSubmit}>
      <div className="section">
        <h1>Update your Spot</h1>
        <h2>Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <input
          name="country"
          value={values.country}
          onChange={handleInputChange}
          placeholder="Country"
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <label htmlFor="address">Street Address</label>
        <input
          name="address"
          value={values.address}
          onChange={handleInputChange}
          placeholder="Street Address"
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <div className="field-group">
          <div style={{ flex: 0.7 }}>
            <label htmlFor="city">City</label>
            {errors.city && <span className="error">{errors.city}</span>}
            <input
              name="city"
              value={values.city}
              onChange={handleInputChange}
              placeholder="City"
            />
          </div>
          <span className="comma">,</span>
          <div style={{ flex: 0.3 }}>
            <label htmlFor="state">State</label>
            {errors.state && <span className="error">{errors.state}</span>}
            <input
              name="state"
              value={values.state}
              onChange={handleInputChange}
              placeholder="State"
            />
          </div>
        </div>

        <div className="field-group">
          <div style={{ flex: 0.5 }}>
            <label htmlFor="lat">Latitude</label>
            {errors.lat && <span className="error">{errors.lat}</span>}
            <input
              name="lat"
              value={values.lat}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
          </div>
          <span className="comma">,</span>
          <div style={{ flex: 0.5 }}>
            <label htmlFor="lng">Longitude</label>
            {errors.lng && <span className="error">{errors.lng}</span>}
            <input
              name="lng"
              value={values.lng}
              onChange={handleInputChange}
              placeholder="Longitude"
            />
          </div>
        </div>
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
          placeholder="Please write at least 30 characters"
          rows="10"
          cols="60"
        />
        {errors.description && <p className="error">{errors.description}</p>}
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
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="section">
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <div className="field-group-price">
          <p>$</p>
          <input
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="Price per night (USD)"
          />
        </div>
        {errors.price && <p className="error">{errors.price}</p>}
      </div>


      <button type="submit">Update Spot</button>
    </form>
  );
};
export default UpdateSpotForm;
