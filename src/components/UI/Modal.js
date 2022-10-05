import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../store/cart-context';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
	return <div  className={classes.backdrop} onClick={() => cartCtx.setCartIsVisible(prevVal => !prevVal)}></div>;
};

const ModalOverlay = ({ children }) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{children}</div>
		</div>
	);
};


const portalElement = document.getElementById('overlays');
const Modal = ({ children }) => {
	return (
    <>
      {ReactDOM.createPortal(<Backdrop/>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
	);
};

// == The non-portal method
/* const Modal = ({ children }) => {
	return (
    <>
      <Backdrop/>
      <ModalOverlay>{children}</ModalOverlay>
    </>
	);
}; */

export default Modal;
