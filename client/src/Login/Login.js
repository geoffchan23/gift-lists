import React from 'react';
import { withRouter } from 'react-router-dom';
import AutoComplete from 'react-autocomplete';
import './Login.scss';
const baseApiUrl = process.env.NODE_ENV === 'dev' ? 'http://localhost:9000' : '';

class Login extends React.Component {
  state = {
    selectedSearchObj: undefined,
    listSearchText: '',
    email: '',
    lists: [],
    showWarning: false,
    password: '',
  }
  handleListSearchChange = (e) => {
    this.setState({
      listSearchText: e.target.value,
    });
  }
  handleAutocompleteSelect = (val, item) => {
    this.setState({
      listSearchText: val,
      selectedSearchObj: item,
    });
  }
  handleNameChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }
  getFilteredListsFromServer = async () => {
    if (this.state.email === '' || this.state.email === ' ') return;
    const apiUrl = new URL(baseApiUrl + '/api/lists');
    const params = {
      email: this.state.email,
    }
    Object.keys(params).forEach(key => apiUrl.searchParams.append(key, params[key]))
    const response = await fetch(apiUrl);
    const lists = await response.json();
    this.setState({ lists });
  }
  goToList = (e) => {
    e.preventDefault();
    const listInfo = this.state.lists.filter(list => list.name.toLowerCase() === this.state.listSearchText.toLowerCase());
    
    if (listInfo.length) {
      this.props.history.push(`/list/${listInfo[0].id}`, { password: this.state.password });
    } else {
      this.setState({
        showWarning: true
      })
    }
  }
  createList = async (e) => {
    e.preventDefault();
    const apiUrl = new URL(baseApiUrl + '/api/lists');
    const params = {
      name: this.state.listSearchText,
      createdBy: this.state.email,
      password: this.state.password,
    }
    Object.keys(params).forEach(key => apiUrl.searchParams.append(key, params[key]))

    const response = await fetch(apiUrl, { method: 'POST' });
    const data = await response.json();
    this.props.history.push(`/list/${data.id}`, { password: this.state.password });
  }
  render() {
    const {
      handleListSearchChange,
      handleAutocompleteSelect,
      handleNameChange,
      goToList,
      createList,
      getFilteredListsFromServer,
      handlePasswordChange,
    } = this;

    const {
      listSearchText,
      email,
      lists,
      showWarning,
      password,
    } = this.state;

    return (
      <form className='Login'>
        <h1>Gift Lists</h1>
        <p>Create and share gift lists with friends and family</p>
        <input
          placeholder='Enter email'
          value={email}
          onChange={handleNameChange}
          onBlur={getFilteredListsFromServer}
          autoComplete='on'
          type='email'
        />
        <AutoComplete
          wrapperProps={{
            className: 'autocomplete',
          }}
          inputProps={{
            placeholder: 'List name',
          }}
          value={listSearchText}
          items={lists || []}
          onChange={handleListSearchChange}
          onSelect={handleAutocompleteSelect}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.id} className='autocomplete-item'>
              {item.name}
            </div>
          }
          getItemValue={(item, a) => item.name }
          shouldItemRender={(item, value) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)}
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter a password (optional)'
          type='password'
          className='password'
        />
        {
          showWarning && <span className='warning'>This list does not exist. Click <strong>Create New List</strong> to create it.</span>
        }
        <div className='actions'>
          <button onClick={goToList} disabled={listSearchText === '' || listSearchText === ' '}>
            Go To List
          </button>
          <button onClick={createList} disabled={listSearchText === '' || listSearchText === ' '}>
            Create New List
          </button>
        </div>
      </form>
    )
  }
}

export default withRouter(Login);