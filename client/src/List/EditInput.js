import React from 'react';
import { MdEdit } from 'react-icons/md';
import './EditInput.scss';

class EditInput extends React.Component {
  state = {
    showEditButton: true,
  }
  componentDidUpdate() {
    this.nameInput.focus();
  }
  render() {
    const {
      inputProps,
      children,
      editMode,
      handleToggleEditMode,
      className,
      clickToEdit,
    } = this.props;

    return (
      <div className={`EditInput ${className}`}>
        <input
          {...inputProps}
          ref={(input) => { this.nameInput = input; }}
          className={editMode ? 'visible' : 'hidden'}
          onBlur={(e) => handleToggleEditMode(e, true)}
          onKeyPress={(e) => e.key === 'Enter' ? handleToggleEditMode(e, true) : null}
        />
        {
          !editMode && (
            <>
              <div onClick={clickToEdit === false ? null : handleToggleEditMode}>
                { children }
              </div>
              <button
                onClick={() => {
                  handleToggleEditMode();
                }}
                className='edit-btn'
              >
                Edit <MdEdit />
              </button>
            </>
          )
        }
      </div>
    )
  }
}
export default EditInput;