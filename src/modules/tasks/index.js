import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {createNewTask, setTaskStatus} from '../../state/tasks';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import './style.scss';
import {Task} from './task';
import {createListTest} from '../../state/lists';
//import {paramsToChangeStatus} from '../../state/paramsToChangeStatus.js';

export class TasksComponent extends PureComponent{
  constructor(props){
    super(props);
      this.state = {
        taskName: '',
        calendar: false
    }
  };

  setTaskState = (event) => {
    this.setState({
      taskName: event.target.value
    });
  };

  onCreateTask = () => {
    const { taskName } = this.state;
    const { listId } = this.props;
    this.props.onCreateNewTask(taskName, listId, 'No workers');
    this.setState({
      taskName: ''
    })
  };

  onDragEnter = (event) => {
    const {  paramsToChangeStatus, listId, title } = this.props;
    event.preventDefault();
    this.props.onChangeStatus(listId, paramsToChangeStatus, title);
  };

  onDragOver = (event) => {
    event.preventDefault();
  };

  dragStart = (event) => {
      event.dataTransfer.setData("Text", event.target.id);
  };

  render(){
    const { taskName } = this.state;
    const { tasks, listId, author, title } = this.props;

    return(
      <div className="TasksComponent-container">
        <div className="board-of-tasks">
          <div
            onDragOver={this.onDragOver} onDragEnter={this.onDragEnter} className="TasksComponent-content">{author && (<div>{author + "'s"} tasks here: </div>)}
        {tasks.filter(task => task.idOfList === listId)
          .filter(task => task.status===title)
          .map(task =>
          <Task
            key={task.id}
            taskName={task.taskName}
            taskId={task.id}
            listId={task.idOfList}
            status={task.status}
            worker={task.worker}
            onEditTask={this.onEditTask}
            onDragStart={this.dragStart}
            draggable="true"
            className="TasksComponent-task">
            </Task>
        )}
          </div>
        </div>

        {(title === "Tasks to do") && (<div className="TasksComponent-form">
          <input className="TasksComponent-imput"
            value={taskName}
            onChange={this.setTaskState}
            placeholder="New task"/>
          <div className="TaskComponent-actionButton">
            <FaPlusSquare
              className="Task-createTask"
              onClick={this.onCreateTask}/>
          </div>
        </div>)}
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  onCreateNewTask: (taskName, idOfList, worker) => dispatch(createNewTask(taskName, idOfList, worker)),
  onChangeStatus: (idOfList, taskId, status) => dispatch(setTaskStatus(idOfList, taskId, status))
});

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
  paramsToChangeStatus: state.paramsToChangeStatus
});

export const Tasks = connect(mapStateToProps, mapDispatchToProps)(TasksComponent);
