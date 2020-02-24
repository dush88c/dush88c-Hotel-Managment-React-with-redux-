import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

import { hotelActions } from '../../../actions';

class HotelManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hotel: {
                name: '',
                description: '',
                address: '',
                noOfRooms: 1,
                imagename: '',
                starRate : 1,
                imageBase64String : '',
                image: {}
            },
            title: 'Add New Hotel ',
            submitted: false
        };

    }

    componentWillMount() {
        if (this.props.match.params && this.props.match.params.id) {
            this.props.getById(this.props.match.params.id);
            this.setState({
                hotel: {
                    id: this.props.match.params.id
                },
                title: 'Update Hotel'
            });
        }
    }

    async componentWillReceiveProps(nextprops) {
        this.setState({ hotel: nextprops.hotel });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { hotel } = this.state;
        const files = event.target.files;
        if (files && files[0]) {
            if(files[0].size > 1097152){
                NotificationManager.warning( 'File size is too big', 'Warning', 4000);
                return true;
             }

            this.setState({
                hotel: {
                    ...hotel,
                    ["imageBase64String"]: " ",
                    ["image"] : event.target.files[0],
                }
            });
        } else {
            this.setState({
                hotel: {
                    ...hotel,
                    [name]: value
                }
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { hotel } = this.state;
        if (hotel.name && hotel.description && hotel.address && (hotel.imageName || hotel.imageBase64String) && hotel.noOfRooms) {
            hotel.isActive = true;
            if (hotel.id === undefined) {
                this.props.addnew(hotel);
            } else {
                this.props.update(hotel);
            }
        }
    }

    render() {        
        const { hotel, submitted, title } = this.state;
        return (
            <div className="col-sm-6">
                <h2>{title}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group ' + (submitted && !hotel.name ? ' has-danger' : '')}>
                        <label htmlFor="firstName">Name</label>
                        <input type="text" className="form-control" name="name" value={hotel.name} onChange={(e) => this.handleChange(e)} />
                        {submitted && !hotel.name &&
                            <div className="help-block text-danger">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !hotel.description ? ' has-danger ' : '')}>
                        <label htmlFor="description">Description</label>
                        <textarea  rows="2" cols="50" className="form-control" name="description" value={hotel.description} onChange={(e) => this.handleChange(e)} />
                        {submitted && !hotel.description &&
                            <div className="help-block text-danger">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !hotel.address ? ' has-danger' : '')}>
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" name="address" value={hotel.address} onChange={(e) => this.handleChange(e)} />
                        {submitted && !hotel.address &&
                            <div className="help-block text-danger">Address is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !hotel.noOfRooms ? ' has-danger' : '')}>
                        <label htmlFor="noOfRooms">No of Rooms</label>
                        <input type="number" className="form-control" min="1" max="600" name="noOfRooms" value={hotel.noOfRooms} onChange={(e) => this.handleChange(e)} />
                        {submitted && !hotel.noOfRooms &&
                            <div className="help-block text-danger">No of Rooms is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !hotel.starRate ? ' has-danger' : '')}>
                        <label htmlFor="starRate">Star Rank</label>
                        <input type="number" className="form-control" min="1" max ="5" name="starRate" value={hotel.starRate} onChange={(e) => this.handleChange(e)} />
                        
                    </div>
                    <div className={'form-group' + (submitted && (!hotel.imageName || !hotel.imageBase64String) ? ' has-danger' : '')}>
                        <label htmlFor="image">Image</label>
                        <input type="file" accept="image/*" className="form-control" name="image"  onChange={(e) => this.handleChange(e)} />
                        {submitted && (!hotel.image || !hotel.imageBase64String) &&
                            <div className="help-block text-danger">Image is required</div>
                        }
                    </div>
                    <button name="submit" type="submit" className="btn btn-success">Save</button> &nbsp;&nbsp;                    
                    <Link to="/hotels" class="btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { hotel } = state.hotels;
    return { hotel };
}

const mapDispatchToProps = {
    addnew: hotelActions.addnew,
    getById: hotelActions.getById,
    update: hotelActions.update
}

const connectedHotelManagePage = connect(mapStateToProps, mapDispatchToProps)(HotelManage);
export { connectedHotelManagePage as HotelManage };