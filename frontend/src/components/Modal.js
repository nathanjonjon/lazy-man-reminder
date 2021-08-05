import React from "react";
import ReactDOM from "react-dom";
import './modal.css'
// import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';


const Modal = ({ visible, toggle }) => visible ? ReactDOM.createPortal(
    <div className="mymodal">
        <div className="mymodal-pop" role="dialog" aria-modal="true">
            <button className="close-btn" type="button" onClick={toggle}>close</button>
            <h3>Anything in mind?</h3>
            <p>add new todo item</p>
            <input
                placeholder="New Todo Title"
                style={{ fontSize: 22 }}
                className="form-control"
            />
            <p>set due time</p>
            <DateTimePicker />
        </div>
        <div className="mymodal-overlay"></div>
    </div >, document.body
) : null;

export default Modal;