import React from 'react';

// CSS
import './Modal.css';

export default function Modal({ show, onClose }) {

    // if (!show) {
    //     return null
    // }
    
  return (
    <div className={`modal-custom ${show ? 'show' : ''}`} onClick={onClose}>
        <div className='modal-custom-content' onClick={(e) => {e.stopPropagation()}}>
            <div className='modal-custom-header'>
                <h4 className='modal-custom-title'>Modal title</h4>
            </div>
            <div className='modal-custom-body'>
                This is a modal content
            </div>
            <div className='modal-custom-footer'>
                <button className='button' onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  )
}