import "babel-polyfill"
import React from 'react'

import Howto from './howto'
import Motivation from './motivation'

const worktimePhaseMin = 25;
const talktimePhaseMin = 15;
const defaultBgColor = '#000';
const workBgColor = '#7B0828';
const talkBgColor = '#548687';
const endWorkSoundLoc = 'snd/applause.mp3';
const endTalkSoundLoc = 'snd/witchlaugh.mp3';
const talktimeTagline = 'What\'s the first actionable thing you can do about it?';
const worktimeTagline = '#DONESDAY #РАБОЧАЯСТАНЦИЯ';

const DonesdayClock = React.createClass({

  getInitialState() {
    return {
        isPaused: true
      , phase: 'worktime' //or 'talktime'
      , minLeft: worktimePhaseMin-1
      , secLeft: 59
      , isSoundOn: true
      , isHelpOn: true //whether modal with help is visible
      , isMotivationOn: false //whether modal with motivation video is visible
      , timerId: null //here we store timer (setInterval) id
    }
  },

  componentDidMount() {
    this.prepareSounds();
    this.updateAppearance('help');
  },

  updateAppearance(toPhase) {
    let bgColor = defaultBgColor;

    if(toPhase == 'worktime') {
      bgColor = workBgColor;
    }

    if(toPhase == 'talktime') {
      bgColor = talkBgColor;
    }

    document.body.style.backgroundColor = bgColor; //this is an ugly hack but don't have time now TODO
  },

  prepareSounds() {
    this.sounds = {};
    this.sounds['talktime'] = new Audio(endTalkSoundLoc);
    this.sounds['worktime'] = new Audio(endWorkSoundLoc);
  },

  playEndPhaseSound(endPhase) {
    this.sounds[endPhase].play();
  },

  changePhase() {
    const toPhase = (this.state.phase == 'worktime') ? 'talktime' : 'worktime';
    this.playEndPhaseSound(this.state.phase);
    this.updateAppearance(toPhase);
    this.setState({
      phase: toPhase,
      minLeft: (toPhase == 'worktime') ? worktimePhaseMin : talktimePhaseMin,
      secLeft: 0
    });
  },

  updateClock() {
    //if seconds and minutes == 0 => change phase, make a sound and restart
    if(this.state.secLeft == 1 && this.state.minLeft == 0) {
      this.changePhase();
      return;
    }
    
    //if seconds === 0 => set seconds to 59 and minutes--
    if(this.state.secLeft == 0) {
      this.setState({
        minLeft: this.state.minLeft - 1,
        secLeft: 59
      });
      return;
    }

    //else seconds--
    this.setState({
      secLeft: this.state.secLeft - 1
    });
  },

  go() {
    this.updateAppearance(this.state.phase);
    const intId = setInterval(() => {
      this.updateClock();
    }, 1000);
    this.setState({
      isPaused: false,
      isHelpOn: false,
      isMotivationOn: false,
      timerId: intId
    });
  },

  pause() {
    clearInterval(this.state.timerId);
    this.setState({
      timerId: 0,
      isPaused: true
    });
  },

  handleBtnClick(Event) {
    Event.preventDefault();
    const whichAct = Event.currentTarget.dataset.action;

    if(whichAct == 'pause') {
      if(this.state.isPaused) {
        this.go();
      } else {
        this.pause();
      }
    }

    if(whichAct == 'motivation') {
      this.pause();
      this.updateAppearance('motivation');
      this.setState({
        isMotivationOn: true
      });
    }

    if(whichAct == 'motivationOff') {
      this.setState({
        isMotivationOn: false
      });
      this.go();
    }

    if(whichAct == 'help') {
      this.updateAppearance('help');
      this.pause();
      this.setState({
        isHelpOn: true
      });
    }

    if(whichAct == 'getStarted') {
      this.setState({
        isHelpOn: false
      });
      this.go();
    }
    
  },

  formattedTimeLeft() {
    //if paused - return pause
    if(this.state.isPaused) {
      return 'BREAK';
    }

    //else - format time
    let time = '';
    time += (this.state.minLeft < 10) ? '0'+this.state.minLeft : this.state.minLeft;
    time += ':';
    time += (this.state.secLeft < 10) ? '0'+this.state.secLeft : this.state.secLeft;
    return time;
  },

  formattedPhase() {
    return (this.state.phase == 'worktime') ? 'WORKINGTIME' : 'TALKINGTIME';
  },

  formattedTagline() {
    return (this.state.phase == 'worktime') ? worktimeTagline : talktimeTagline;
  },

  render() {

    if(this.state.isHelpOn) {
      return (
        <div>
          <Howto />
          <br /><br />
          <a className="dd-btn-getStarted" data-action="getStarted" onClick={this.handleBtnClick} href="#">Get Started</a>
        </div>
      )
    }

    if(this.state.isMotivationOn) {
      return (
        <div>
          <Motivation />
          <br /><br />
          <a className="dd-btn-motivationOff" data-action="motivationOff" onClick={this.handleBtnClick} href="#">Back to work</a>
        </div>
      )
    }

    return (
      <div>
        <h3>{this.formattedPhase()}</h3>
        <div className="clockContainer">
          <h4 className="clockFace" id="clockFace">{this.formattedTimeLeft()}</h4>
        </div>
        <p className="dd-tagline">{this.formattedTagline()}</p>

        <ul className="dd-actionLinks">
          <li><a className="dd-actionLink dd-btn-pause" data-action="pause" onClick={this.handleBtnClick} href="#">pause</a></li>
          <li><a className="dd-actionLink dd-btn-help" data-action="help" onClick={this.handleBtnClick} href="#">get help</a></li>
          <li><a className="dd-actionLink dd-btn-motivation" data-action="motivation" onClick={this.handleBtnClick} href="#">get inspired</a></li>
        </ul>
      </div>
    )
  }

});

export default DonesdayClock;
