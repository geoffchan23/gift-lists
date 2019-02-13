import React from 'react';
import './List.scss';
import Person from './Person';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import generateUID from './generateUID';
const baseApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'http://192.243.102.90:9000';

class List extends React.Component {
  state = {
    listInfo: {},
    people: [],
    showEnterPassword: false,
    password: undefined,
    errorMsg: null,
  }
  componentWillMount = async () => {
    await this.getListInfoFromServer();
  }
  getListInfoFromServer = async () => {
    console.log('password', this.state.password, this.props.history.location);
    let password = this.state.password;
    if (this.props.history.location.state) password = this.props.history.location.state.password;
    const response = await fetch(`${baseApiUrl}/api/lists/${this.props.match.params.listId}?password=${password}`);
    const data = await response.json();

    if (data.error) {
      this.setState({
        showEnterPassword: true,
        errorMsg: data.error === 2 ? data.msg : null,
      })
    } else {
      data.people = data.people.length ? this.indexList(data.people) : [{
        name: '',
        list: [],
        selected: true,
        index: 0,
        editMode: true,
        editInputField: 'name',
        id: generateUID(),
      }];
  
      console.log(data);
      this.setState({ 
        listInfo: {
          ...data,
          people: undefined
        },
        people: data.people,
        showEnterPassword: false,
      });
    }
  }
  indexList = (list) => (
    list.map((d, index) => {
      d.index = index;
      d.editInputField = '';
      d.selected = (index === list.length-1);
      d.id = generateUID();
      return d;
    })
  )
  bringPersonToFront = (id) => {
    console.log('bringPersonToFront');
    if (this.state.people.filter(p => p.selected)[0].id === id) return;
    let oldList = [...this.state.people];
    let index = 0;

    oldList = oldList.map((d) => {
      if (d.id === id) {
        d.index = oldList.length-1;
        d.selected = true;
      } else {
        d.index = index;
        d.selected = false;
        index++
      }
      return d;
    });

    this.setState({ people: oldList });
  }
  createPersonCard = () => {
    console.log('createPersonCard');
    const people = [ ...this.state.people ];
    if (people.length !== 0) {
      const prevSelectedPerson = people.filter(person => person.selected);
      prevSelectedPerson[0].selected = false;
    }
    people.push({
      name: '',
      list: [],
      selected: true,
      index: people.length,
      editMode: true,
      editInputField: 'name',
      id: generateUID(),
    });
    this.setState({ people });
  }
  removePerson = (index, e) => {
    console.log('removePerson');
    let people = [...this.state.people ].filter(p => p.index !== index);
    people = this.indexList(people);
    this.setState({ people }, () => this.updateListOnServer());
    e.stopPropagation();
  }
  handleToggleEditMode = (index, field) => {
    console.log('handleToggleEditMode', index, field);
    this.setState({
      people: [
        ...this.state.people.map(person => {
          if (person.index === index) {
            person.editInputField = field;
          }
          return person;
        })
      ]
    })
    if (!field || field === '') {
      this.updateListOnServer();
    }
  }
  handleEditInput = (index, field, e) => {
    console.log('handleEditInput', index, field);
    this.setState({
      people: [
        ...this.state.people.map(person => {
          if (person.index === index) {
              person[field] = e.target.value;
          }
          return person;
        })
      ]
    })
  }
  addGift = (index, e) => {
    console.log('addGift', index);
    this.setState({
      people: [
        ...this.state.people.map(person => {
          if (person.index === index) {
            person.list.push({
              id: generateUID(),
              name: '',
              link: '',
            })
          }
          return person;
        })
      ]
    })
    e.stopPropagation(); 
  }
  handleUpdateGift = (index, id, field, e) => {
    console.log('handleUpdateGift', index, id, field);
    this.setState({
      people: [
        ...this.state.people.map(person => {
          if (person.index === index) {
            const giftToUpdate = person.list.filter(g => g.id === id)[0];
            giftToUpdate[field.split('.')[1]] = e.target.value;
          }
          return person;
        })
      ]
    })
  }
  removeGift = (index, id) => {
    this.setState({
      people: [
        ...this.state.people.map(person => {
          if (person.index === index) {
            person.list = person.list.filter(g => g.id !== id);
          }
          return person;
        })
      ]
    }, () => this.updateListOnServer())
  }
  updateListOnServer = async () => {
    const params = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.people),
    }
    const response = await fetch(`${baseApiUrl}/api/lists/${this.props.match.params.listId}`, params);
    const data = await response.json();
    console.log('response from PATCH', data);
  }
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }
  submitPassword = () => {
    this.setState({ errorMsg: null }, () => {
      this.getListInfoFromServer();
    })
  }
  goBack = () => {
    this.props.history.push('/');
  }
  render() {
    const {
      listInfo,
      people,
      showEnterPassword,
      password,
      errorMsg,
    } = this.state;

    const {
      bringPersonToFront,
      createPersonCard,
      removePerson,
      handleToggleEditMode,
      handleEditInput,
      addGift,
      handleUpdateGift,
      removeGift,
      handlePasswordChange,
      submitPassword,
      goBack,
    } = this;

    return (
      <>
        <button className='back-btn' onClick={goBack}>
          <MdArrowBack />
        </button>
        {showEnterPassword ? (
          <div className='enter-password'>
            {
              errorMsg && <span>{ errorMsg }</span>
            }
            <input
              type='password'
              value={password}
              placeholder='Enter password'
              onChange={handlePasswordChange}
              onKeyPress={(e) => e.key === 'Enter' ? submitPassword() : null}
              className={errorMsg ? 'incorrect' : ''}
            />
            <button onClick={submitPassword}>
              Submit
            </button>
          </div>
        ) : (
          <div className='List'>
            <h1>{listInfo.name}</h1>
            <h2>Created by: {listInfo.createdBy} on {new Date(listInfo.createdOn).toLocaleString()}</h2>

            <div className='people'>
              { 
                people && people.map((person) => (
                  <Person 
                    key={person.id}
                    {...person}
                    bringPersonToFront={bringPersonToFront}
                    removePerson={removePerson}
                    handleToggleEditMode={handleToggleEditMode}
                    handleEditInput={handleEditInput}
                    addGift={addGift}
                    handleUpdateGift={handleUpdateGift}
                    removeGift={removeGift}
                  />
                ))
              }
              <button onClick={createPersonCard} className='create-person-card-btn'>
                <MdAdd />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default List;