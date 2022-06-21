import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
const Modal = ({ isShowing, hide, title, ...props }) =>
    isShowing
        ? ReactDOM.createPortal(
              <>
                  <div className="modal">
                      <div className="modal-container">
                          <div className="modal-title">
                              <h1>{title}</h1>
                              <span onClick={hide}>close</span>
                          </div>
                          <div className="modal-content">{props.children}</div>
                          <div className="modal-action">{props.action}</div>
                      </div>
                  </div>
              </>,
              document.body
          )
        : null

Modal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default Modal
