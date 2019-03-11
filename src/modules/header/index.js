import React, { PureComponent } from 'react';
import './style.scss';

export class Header extends PureComponent {

  render(){
    return (
      <div className="Header-container">
        <div className="Header-name">Todolingus</div>
      </div>
    );
  }
}
