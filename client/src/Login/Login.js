import React from 'react';
import { withRouter } from 'react-router-dom';
import AutoComplete from 'react-autocomplete';
import './Login.scss';
// const baseApiUrl = 'http://localhost:9000';
const baseApiUrl = 'http://192.243.102.90:9000';

class Login extends React.Component {
  state = {
    selectedSearchObj: undefined,
    listSearchText: '',
    email: '',
    lists: [],
    showWarning: false,
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
  goToList = () => {
    const listInfo = this.state.lists.filter(list => list.name.toLowerCase() === this.state.listSearchText.toLowerCase());
    
    if (listInfo.length) {
      this.props.history.push(`/list/${listInfo[0].id}`);
    } else {
      this.setState({
        showWarning: true
      })
    }
  }
  createList = async () => {
    const apiUrl = new URL(baseApiUrl + '/api/lists');
    const params = {
      name: this.state.listSearchText,
      createdBy: this.state.email,
    }
    Object.keys(params).forEach(key => apiUrl.searchParams.append(key, params[key]))

    const response = await fetch(apiUrl, { method: 'POST' });
    const data = await response.json();
    this.props.history.push(`/list/${data.id}`);
  }
  render() {
    const {
      handleListSearchChange,
      handleAutocompleteSelect,
      handleNameChange,
      goToList,
      createList,
      getFilteredListsFromServer,
    } = this;

    const {
      listSearchText,
      email,
      lists,
      showWarning,
    } = this.state;

    return (
      <form className='Login'>
        <h1>Gift Lists</h1>
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
            onKeyPress: (e) => e.key === 'Enter' ? goToList() : null
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