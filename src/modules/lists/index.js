import React, {PureComponent} from 'react';
import {Deadline} from './deadline';
import {List} from './list';
import {connect} from 'react-redux';
import {editListTitle, removeList} from '../../state/lists';
import FaTimes from 'react-icons/lib/fa/times-circle';
import FaEdit from 'react-icons/lib/fa/edit';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaChevron from 'react-icons/lib/fa/chevron-down';
import './style.scss';

export class ListsComponent extends PureComponent {
  constructor(props){
    super(props);
      this.state=({
        editTitle: false,
        editedTitle: this.props.title,
        showList: false
      })
  }

  onEditTitle = () => {
    this.setState({
      editTitle: true
    })
  }

  editTitleName = (event) => {
    const newTitle = event.target.value;
    this.setState({
      editedTitle: newTitle
    })
  }

  onRemoveList = () => {
    const { idOfLists } = this.props;
    this.props.onRemoveList(idOfLists);
  }

  onChangeTitle = () => {
    const {editedTitle} = this.state;
    const {idOfLists} = this.props;
    this.props.onEditListTitle(editedTitle, idOfLists);
    this.setState({
      editTitle: false
    })
  }

  showList = () => {
    this.setState({
      showList: true
    })
  }

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  render() {
    const {title, day, month, year, idOfLists} = this.props;
    const {editTitle, editedTitle, showList} = this.state;

    return(
      <div className="Lists-listsContent">
        <div className="Lists-listsContent-header">
          <div className="Lists-icon-container_delete">
            <FaTimes className="Lists-icon__delete" onClick={this.onRemoveList}/>
          </div>
          <div className="Lists-listsContent-title">
          {!editTitle &&(
            <div>{title}
              <FaEdit className="Lists-icon-listsContent" onClick={this.onEditTitle}/>
            </div>)}
            {editTitle && (
            <div>
              <input className="Lists-input" value={editedTitle}
                onChange={this.editTitleName}/>
              <FaCheckCircle className="Lists-icon-listsContent" onClick={this.onChangeTitle}/>
            </div>
            )}
          </div>
          <div className="List-deadline">
            <Deadline day={day} month={this.months[month]} year={year}/>
            <div className="Lists-icon-container__go-down">
              <FaChevron className="List-icon-go-down" onClick={this.showList}/>
            </div>
          </div>
        </div>
            {showList &&(
        <div className="Lists-boards-with-lists">
          <List id={idOfLists} title="Tasks to do"/>
          <List id={idOfLists} title="Tasks in progress"/>
          <List id={idOfLists} title="Tasks done"/>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onEditListTitle: (editedTitle, idOfLists) =>  dispatch(editListTitle(editedTitle, idOfLists)),
  onRemoveList: (idOfLists) => dispatch(removeList(idOfLists))
});

export const Lists = connect(mapStateToProps, mapDispatchToProps)(ListsComponent);
