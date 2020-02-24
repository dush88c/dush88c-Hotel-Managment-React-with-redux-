import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../Shared/StarRating';
import PopupModal from '../../Shared/PopupModal';
import { connect } from 'react-redux';

import { hotelActions } from '../../../actions';

class HotelCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            body: ''
        }
    }

    onClickDelete = (hotel) => {
        this.setState({ isShow: true, body: `"${hotel.name}" is going to be deleted and This action cannot be undone.` })
    }

    onDeletConfirm = (hotel) => {
        if (hotel && hotel.id >= 1) {
            hotel.isActive = false;
            this.setState({ isShow: false });
            this.props.deleteHotel(hotel);
        } else {
            NotificationManager.error('Please select a correct hotel to delete.!','Error',  6000);
            this.props.showError('');
        }

    }

    render() {
        const hotel = this.props.hotel;
        return (
            <div className="Hotel-card">
                <div className="Hotel-card card">
                    <img className="card-img-top" src={"data:image/gif;base64," + hotel.imageBase64String} alt="" />
                    <div className="card-body">
                        <h4 className="card-title">{hotel.name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{hotel.address}</h6>
                        <p className="text-justify" style={{ fontSize: '14px' }}>{hotel.description}</p>
                        <div className="float-left mt-1">
                            <StarRating rating={hotel.starRate} />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="clearfix">
                            <a href={'/hotel/edit/' + hotel.id}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a> &nbsp;
                            <a onClick={() => this.onClickDelete(hotel)}><i className="fa fa-trash" aria-hidden="true"></i></a>
                            <div className="card-footer-badge float-right badge badge-primary badge-pill"> <span>Rooms &nbsp;</span>{hotel.noOfRooms}</div>
                        </div>
                    </div>
                </div>
                {this.state.isShow &&
                    <PopupModal isShow={this.state.isShow} handleOnClickOk={(hotel) => this.onDeletConfirm(hotel)} data={hotel} body={this.state.body}></PopupModal>
                }

            </div>

        );
    }
}


HotelCard.defaultProps = {
    hotel: {}
};

HotelCard.propTypes = {
    hotel: PropTypes.object
};

function mapState(state) {
    const { hotels } = state;
    return { hotels };
}

const actionCreators = {
    deleteHotel: hotelActions.delete
}

const connectedHotelCardPage = connect(mapState, actionCreators)(HotelCard);
export { connectedHotelCardPage as HotelCard };