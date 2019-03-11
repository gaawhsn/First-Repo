import React, {PureComponent} from 'react';
import FaClock from 'react-icons/lib/fa/clock-o';
import './style.scss';

export class Deadline extends PureComponent {

  render() {
    const { day, month, year} = this.props;

    return(
      <div className="Deadline-container">
        <div className="Deadline-info">
          <FaClock className="Deadline-icon-clock"/>
        </div>
          <div className="Deadline-date">
          {day} {month} {year}
        </div>
      </div>
    )
  }
}
