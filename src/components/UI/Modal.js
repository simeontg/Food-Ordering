import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = ({onCloseCart}) => {
    return <div onClick={onCloseCart} className={styles.backdrop}></div>
}
const ModalOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
  return (
     <>
     {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement)}
     {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
     </>
  )
}

export default Modal