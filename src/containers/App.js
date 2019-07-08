import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestRobots } from '../actions.js';


const MapStateToProps = state => {
  return {
    searchfield: state.serarchRobots.searchfield,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.searchRobots.error
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {

  componentDidMount() {
    // console.log(this.props.store.getState());
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchfield, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(App);