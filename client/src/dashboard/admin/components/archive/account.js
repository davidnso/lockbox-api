import React, { Component } from 'react'
import './account.css';
export default class account extends Component {
    render() {
        return (
            <div className="archiveContainerm">
            <p className="accountHeading">Account</p>
            <div style={{display: 'flex'}}>
                <img className="accountImage" src={require('../../../../resources/file.png')}/>
                <div style={{marginLeft: '20px'}}>
                        <p className="building-name">Bulldog Admin</p>
                </div>
            </div>
        </div>
        )
    }
}


