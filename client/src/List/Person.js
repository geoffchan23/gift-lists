import React from 'react';
import { MdClose, MdAdd, MdDeleteForever } from 'react-icons/md';
import EditInput from './EditInput';
import './Person.scss';

const Person = ({
  id,
  name,
  list,
  selected,
  index,
  editInputField,
  removePerson,
  handleEditInput,
  handleToggleEditMode,
  bringPersonToFront,
  addGift,
  handleUpdateGift,
  removeGift,
}) => (
  <div
    className={['Person' + (selected ? ' selected' : '')]}
    onClick={() => bringPersonToFront(id)}
    style={{
      zIndex: index,
      left: index * 60 + 'px',
    }}
  >
    <EditInput
      editMode={editInputField === 'name'}
      inputProps={{
        value: name,
        placeholder: 'Enter name',
        onChange: (e) => handleEditInput(index, 'name', e),
      }}
      handleToggleEditMode={(e, hide) => handleToggleEditMode(index, hide ? '' : 'name')}
      className='person-edit-name'
    >
      <h3>{ name === '' ? 'Click to enter name' : name }</h3>
    </EditInput>
    <ul>
      {
        list.map((gift, giftIndex) => (
          <li key={gift.id}>
            <div>

              <EditInput
                editMode={editInputField === gift.id + 'gift.name'}
                inputProps={{
                  value: gift.name,
                  placeholder: 'Enter gift',
                  onChange: (e) => handleUpdateGift(index, gift.id, 'gift.name', e),
                }}
                handleToggleEditMode={(e, hide) => handleToggleEditMode(index, hide ? '' : gift.id + 'gift.name')}
                className='gift-edit-name'
              >
                <h4>{ giftIndex + 1 }) { gift.name === '' ? 'Click to enter name' : gift.name }</h4>
              </EditInput>

              <EditInput
                editMode={editInputField === gift.id + 'gift.link'}
                inputProps={{
                  value: gift.link,
                  placeholder: 'Enter link',
                  onChange: (e) => handleUpdateGift(index, gift.id, 'gift.link', e),
                }}
                handleToggleEditMode={(e, hide) => handleToggleEditMode(index, hide ? '' : gift.id + 'gift.link')}
                className='gift-edit-input'
                clickToEdit={gift.link === ''}
              >
                {
                   gift.link === '' ?
                    <span>Click to enter link</span> :
                    <>
                      <span className='gift-link-label'>{ gift.link }</span>
                      <a href={gift.link} target='_'>Link</a>
                    </>
                }
               
              </EditInput>

              <button onClick={() => removeGift(index, gift.id)} className='remove-gift-btn'>
                <MdDeleteForever />
              </button>
            </div>
          </li>
        ))
      }
      <li>
        <button onClick={(e) => addGift(index, e)} className='add-gift-btn'>
          Add Gift <MdAdd />
        </button>
      </li>
    </ul>
    <button onClick={(e) => removePerson(index, e)} className='remove-person-btn'>
      <MdClose />
    </button>
  </div>
);

export default Person;