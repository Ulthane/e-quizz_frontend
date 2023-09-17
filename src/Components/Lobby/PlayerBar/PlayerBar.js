// Librairie
import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

// CSS
import './PlayerBar.css';

export default function PlayerBar() {

    const [show, setShow] = useState(false);

  return (
    <>
        <div className='playerBarBG'>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <button className="playerBarBG_btn" onClick={() => setShow(true)}>Login</button>
                <Modal show={show} onClose={() => setShow(false)} />
            </div>
        </div>

        {/* Modal */}
    </>
  )
}