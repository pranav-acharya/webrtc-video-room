import React, { Component } from 'react';
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import store from '../store'
import io from 'socket.io-client'

class RoomPage extends Component {
  constructor(props) {
    super(props);
    var navigator = window.navigator;
    navigator.getUserMedia =  navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    alert("GetUserMediaStatus" + (!!navigator.webkitGetUserMedia));
    /*
    navigator.getUserMedia = new Promise(function(resolve,reject){
      navigator.webkitGetUserMedia({
        audio: true,
        video: true
      },function(stream){ resolve(stream)}, function(err){reject(err)});
    }); 
    */
    navigator.getUserMedia({
      audio: true,
      video: true
    },function(stream){ console.log("success")}, function(err){alert(err.message)});
    
    /*
    this.getUserMedia({
      audio: true,
      video: true
    }).catch(e => alert('getUserMedia() error: ' + e.name + 'Log:' + JSON.stringify(e) + '|Msg:' + e.message))
    */
    this.socket = io.connect();
  }
  componentDidMount() {
    this.props.addRoom();
  }
  render(){
    return (
      <div>
        <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={window.navigator.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={window.navigator.getUserMedia} />
      </div>
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({ type: 'ADD_ROOM', room: ownProps.match.params.room })
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
