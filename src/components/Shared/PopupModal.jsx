import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class PopupModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isShow: nextProps.isShow });
    }

    handleClose = () => {
        this.setState({ isShow: false });
    }

    onConfirm = () => {     
        this.props.handleOnClickOk(this.props.data);
    }

    render() {
        const { title, body } = this.props;
        return (
            <Modal show={this.state.isShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.onConfirm}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

PopupModal.defaultProps = {
    body: '',
    title: 'Are You sure ?',
    handleOnClickOk: {},
    isShow: false,
    data: {}
};

PopupModal.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    handleOnClickOk: PropTypes.func,
    isShow: PropTypes.bool,
    data: PropTypes.object
};

export default PopupModal;