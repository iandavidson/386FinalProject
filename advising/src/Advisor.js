import React, { Component } from 'react';
import logo from './logo.svg';
import './Advisor.css';

class Schedule extends Component {
    render() {
        return (
            <div className={"schedule-container"} onClick={() => this.props.scheduleClick()}>
                <div className={"schedule-title" + (this.props.hover ? "-hover" : "") +(this.props.visible ? "-click": "")} onMouseEnter={() => this.props.scheduleHover(true)} onMouseLeave={() => this.props.scheduleHover(false)}>
                    <span>Schedule</span>
                </div>
            </div>
        )
    }
}

class Advisor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduleVisible: false,
            scheduleHover: false,
        };

        this.scheduleClick = this.scheduleClick.bind(this);
        this.scheduleHover = this.scheduleHover.bind(this);
    }


    scheduleClick() {
        this.setState({
            scheduleVisible: !(this.state.scheduleVisible)

        })
    }

    scheduleHover(current) {
        this.setState({
            scheduleHover: current,
        })
    }

    render() {
        return (
            <div className="full-wrap">
                <div className="top-bar">
                    <div className="user"></div>
                    <div className="log-out"></div>
                </div>
                <div className="side-bar">
                    <Schedule
                        scheduleClick={this.scheduleClick}
                        scheduleHover={this.scheduleHover}
                        hover={this.state.scheduleHover}
                        click={this.state.scheduleClick}
                    />
                </div>
                <div className="display-space">

                </div>
            </div>
        );
    }
}

export default Advisor;
