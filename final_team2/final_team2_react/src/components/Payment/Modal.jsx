import React from 'react';
import './Modal.css'; // 모달 CSS 파일을 가져옵니다.

function Modal({ title, content, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{title}</h2>
                <p style={{fontSize:'12px'}}>{content}</p>
            </div>
        </div>
    );
}

export default Modal;