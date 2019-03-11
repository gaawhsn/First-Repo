import React, { PureComponent } from 'react';
import 'normalize.css/normalize.css';
import './style.scss';
import { connect } from 'react-redux';
import { createNewList } from '../../state/lists';
import Calendar from 'react-calendar';
import FaCalendar from 'react-icons/lib/fa/calendar';
import { Link } from 'react-router-dom';

class FormToCreateNewListComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      owner: '',
      editTitle: false,
      showCalendar: false,
      deadline: new Date()
    };
  }

  onAuthorChange = (event) => {
    this.setState({
      owner: event.target.value
    });
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  };

  onCreateNewList = () => {
    const { title, owner, deadline } = this.state;
    this.props.onCreateNewList2(title, owner, deadline.getDate(), deadline.getMonth(), deadline.getFullYear());
    this.setState({
      title: '',
      owner: '',
      deadline: new Date()
    })
  };

  onChooseDeadline = () => {
    this.setState({ showCalendar: true });
  };

  onChooseDate = (date) => {
    this.setState({
      deadline: date,
      showCalendar: false
    })
  };

  onEditTitle = () => {
    this.setState({
      editTitle: true
    })
  };

  render() {

    const { owner, title, showCalendar } = this.state;

    return (
      <div className="FormToCreateNewList-tools">
        <div className="FormToCreateNewList-inputs-tools">
          <div>
            <div className="FormToCreateNewList-input-title">Project name:
            </div>
            <input
              className="FormToCreateNewList-tools-item"
              value={title}
              onChange={this.onTitleChange}
              placeholder="Title" />
          </div>
          <div>
            <div className="FormToCreateNewList-input-title">Project menager:
            </div>
            <input
              className="FormToCreateNewList-tools-item"
              value={owner}
              onChange={this.onAuthorChange}
              placeholder="Author" />
          </div>
          <div>
            <div className="FormToCreateNewList-input-title">Set deadline: </div>
            <div className="FormToCreateNewList-icon-container">
              <FaCalendar
                className="FormToCreateNewList-calendar-icon"
                onClick={this.onChooseDeadline} />
              {showCalendar &&
                (<Calendar
                  className="FormToCreateNewList-calendar"
                  activeStartDate={new Date()}
                  calendarType="ISO 8601"
                  locale="en-EN"
                  value={this.state.date}
                  minDate={new Date()}
                  onClickDay={this.onChooseDate} />)}
            </div>
          </div>
          <button className="FormToCreateNewList-button-tools-item"
            onClick={this.onCreateNewList}>
            <Link to="/lists">Create new list</Link>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onCreateNewList2: (title, owner, day, month, year) => dispatch(createNewList(title, owner, day, month, year))
});

export const FormToCreateNewList = connect(mapStateToProps, mapDispatchToProps)(FormToCreateNewListComponent);
