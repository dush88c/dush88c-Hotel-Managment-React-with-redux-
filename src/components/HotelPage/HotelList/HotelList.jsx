import React from 'react';
import PropTypes from 'prop-types';
import { HotelCard } from './HotelCard';

const getHotels = (hotels) => {
    return (
        <div className="card-deck">
            { Array.isArray(hotels) && hotels.length > 0 &&
                hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
            }
        </div>
    );
};

const HotelList = (props) => (
    <div>
        {getHotels(props.hotels)}
    </div>
);

HotelList.defaultProps = {
    hotels: []
};

HotelList.propTypes = {
    hotels: PropTypes.array
};

export default HotelList;