import {
    useState,
    useRef,
    useEffect
} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './styles.scss';

/**
 * Modal Component
 * @prop {*} children - Default React children
 * @prop {*} initContent - Modal init content
 * @prop {*} title - Modal title
 * @prop {*} options - Modal options
 * @prop {*} onOk - Fire the action on ok
 * @prop {*} onCancel - Fire the action on cancel
 * @prop {*} open - Using for control component by hand
 * @prop {boolean} manualControl - Enable/Disable the way how to control the component using build-in or manual throw `open` prop
 * @returns Compoment
 */

function Modal(props) {
    const overlayRef = useRef(null);
    const [isModalOpen, changeModalStatus] = useState(false);
    const {
        children,
        initContent,
        title,
        options,
        onOk,
        onCancel,
        open,
        manualControl,
        onInitContentClick,
    } = props;

    const _options = Object.assign({
        buttonOkText: 'Ok',
        buttonCancelText: 'Cancel',
    } , options);

    useEffect(() => {
        if (manualControl) {
            changeModalStatus(open);
        }
    }, [open, manualControl]);

    /**
     * Handle click outside of Modal
     * @param {object} - Default event object
     * @return {void}
     */
    const handleClickOutside = (e) => {
        const { current } = overlayRef;

        if (e.target.contains(current)) {
            changeModalStatus(false);

            if (manualControl && onCancel && typeof onCancel === 'function') {
                onCancel();
            }
            console.log('click outside')
        }
    }

    /**
     * Handle open modal
     * Change state and call the calback
     * @return {void}
     */
    const handleOpenModal = () => {
        if (manualControl) { 
            onInitContentClick();
            return;
        }
        changeModalStatus(true);
    }

    /**
     * Handle click ok
     * Change state and call the calback
     * @return {void}
     */
    const handleOk = () => {
        changeModalStatus(false);

        if (onOk && typeof onOk === 'function') {
            console.log('ok')
            onOk();
        }
    }

    /**
     * Handle click cancel
     * Change state and call the calback
     * @return {void}
     */
    const handleCancel = () => {
        changeModalStatus(false);

        if (onCancel && typeof onCancel === 'function') {
            console.log('ok')
            onCancel();
        }
    }

    return <div className="content-wrapper">
        <div
            className="init-content"
            onClick={handleOpenModal}
        >
            { initContent }
        </div>
        
        { isModalOpen ? <div className="modal-wrapper">
            <div
                className="modal-overlay"
                onClick={(e) => handleClickOutside(e)}
                ref={overlayRef}
            >
                <div className="modal-contailer">
                    <div className="modal-header">
                        <h3 className="modal-title">
                            { title || 'Modal title' }
                        </h3>
                        <Button variant="outline-secondary" onClick={handleCancel}>&#10005;</Button>
                    </div>

                    <div className="modal-content">
                        { children }
                    </div>

                    <div className="modal-footer">
                        <div className="modal-actions">
                            <Button
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                { _options.buttonCancelText }
                            </Button>{' '}
                            <Button
                                variant="primary"
                                onClick={handleOk}
                            >
                                { _options.buttonOkText }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null}
    </div>
}

Modal.propTypes = {
    initContent: PropTypes.element,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    options: PropTypes.shape({
        buttonOkText: PropTypes.string,
        buttonCancelText: PropTypes.string
    }),
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onInitContentClick: PropTypes.func,
    open: PropTypes.bool,
    manualControl: PropTypes.bool,
};

Modal.defaultProps = {
    initContent: <Button variant="primary">Open Modal</Button>,
    title: "Modal title",
    options: {},
    open: false,
    onInitContentClick: () => {},
    manualControl: false,

}

export default Modal;
