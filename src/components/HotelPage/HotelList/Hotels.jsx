import React from 'react';
import { connect } from 'react-redux';
import { hotelActions } from '../../../actions';
import HotelList from './HotelList';

class Hotels extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAll();
    }

    render() {
        const hotels = this.props.allHotels ?? [];
        return (
            <div className="container-fluid" style={{ marginLeft: '-15px' }}>
                <div className="d-flex flex-row">
                    <div className="col-sm-12">
                        <HotelList hotels={hotels} />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { allHotels } = state.hotels;
    return { allHotels };
}

const mapDispatchToProps = {
    getAll: hotelActions.getAll,
};

const connectedHotelsPage = connect(mapStateToProps, mapDispatchToProps)(Hotels);
export { connectedHotelsPage as Hotels };