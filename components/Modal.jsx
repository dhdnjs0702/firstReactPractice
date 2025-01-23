import React, {forwardRef} from 'react'

const Modal = forwardRef(({modalOption, firstClassName, secondClassNam, closeBtnClass, modalContent}, ref) => {
    return (
        <div ref={ref} className="modal">
            <div onClick={modalOption} className={firstClassName}></div>
            <div className={secondClassNam}>
                <h2>에러 발생</h2>
                <p>
                    {modalContent}
                </p>
                <button className={closeBtnClass} onClick={modalOption}>
                    CLOSE
                </button>
            </div>
        </div>
    )
});

export default Modal;
