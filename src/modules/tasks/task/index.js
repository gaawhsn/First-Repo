import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { removeTask, editTaskWorker, editTask, setTaskStatus } from '../../../state/tasks';
import { paramsToChangeStatus } from '../../../state/paramsToChangeStatus.js';
import FaCheck from 'react-icons/lib/fa/check';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTimes from 'react-icons/lib/fa/times-circle';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import FaGoAhead from 'react-icons/lib/fa/arrow-circle-right';
import FaGoBack from 'react-icons/lib/fa/arrow-circle-left';
import classNames from 'classnames';
import './style.scss';

export class TaskComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedTaskName: this.props.taskName,
      calendar: false,
      addWorker: false,
      workerToAdd: '',
      showInput: false
    }
  };

  onRemoveTask = () => {
    const { idOfList } = this.state;
    const taskId = this.props.taskId;
    console.log(this.props.worker);
    this.props.onRemoveTask(taskId);
  };

  onAddWorker = () => {
    this.setState({
      addWorker: true,
    });
  };

  onCreateWorker = (event) => {
    const workerToAddToTask = event.target.value;
    this.setState({
      workerToAdd: workerToAddToTask
    });
  };

  onEditTask = (event) => {
    console.log(this.props.taskId);
    this.setState({
      showInput: true
    });
  };

  onEditTaskName = (event) => {
    const taskName = event.target.value
    this.setState({
      editedTaskName: taskName
    });
  };

  onSendEditedTask = () => {
    const { editedTaskName } = this.state;
    const { taskId } = this.props;
    this.props.onEditTask(editedTaskName, taskId);
    this.setState({
      showInput: ''
    })
  };

  onChangeStatusGoAhead = () => {
    let newStatus = '';
    const { listId, taskId, status } = this.props;
    { status === "Tasks to do" ? newStatus = "Tasks in progress" : newStatus = "Tasks done" }
    this.props.onChangeStatus(listId, taskId, newStatus);
  };

  onChangeStatusGoBack = () => {
    let newStatus = '';
    const { listId, taskId, status } = this.props;
    { status === "Tasks done" ? newStatus = "Tasks in progress" : newStatus = "Tasks to do" }
    this.props.onChangeStatus(listId, taskId, newStatus);
  };

  dragStart = (event) => {
    event.dataTransfer.setData("Text", event.target.id);
    const { taskId } = this.props;
    this.props.onSendParamsToChangeStatus(taskId);
  };

  onSendCreatedWorker = () => {
    this.props.onAddWorkerToTask(this.props.taskId, this.state.workerToAdd);
    this.setState({
      addWorker: ''
    })
  };

  render() {
    const { workerToAdd, addWorker, showInput, editedTaskName } = this.state;
    const { taskName, taskId, worker, status } = this.props;

    return (
      <div onDragStart={this.dragStart}
        draggable="true"
        className={classNames("TasksComponent-task", { 'showInput': showInput })}>
        <div className="TaskComponent-box-worker">Worker:
                  {!addWorker && (<div className="TaskComponent-workerName">{worker}
          </div>)}
          <div className={classNames("Task-addingWorker_hidden", { "Task-addingWorker": addWorker })}>
            {addWorker && (
              <div className="TaskComponent-input-and-icon"><input
                className={classNames("TaskComponent-Input__hidden", { "input-absolute": addWorker })}
                type="text"
                value={workerToAdd}
                placeholder="add worker"
                onChange={this.onCreateWorker} />
                {<FaUserPlus
                  className="Task-addUserToList"
                  onClick={this.onSendCreatedWorker} />}
              </div>)}
          </div>
          <div className="TaskComponent-actionButton">
            {!addWorker && (<FaUserPlus
              className="Task-addUser"
              id={taskId}
              onClick={this.onAddWorker} />)}
          </div>
        </div>
        {showInput && (
          <div className="TaskComponent-input-taskName-container">
            <input className="TaskComponent-input-taskName" type="text"
              value={editedTaskName}
              onChange={this.onEditTaskName} />
            <FaCheck className="TaskComponent-icon-check" onClick={this.onSendEditedTask} />
          </div>)}
        <div className={classNames("TasksComponent-taskContent", { 'hideText': showInput })}
          key={Math.floor(Math.random() * 100000)}>
          <div className="TasksComponent-box-content">{taskName}
          </div>
          <div className="TaskComponent-buttonWrapper">
            <div className="TaskComponent-actionButton">
              {(status !== "Tasks to do") && (<FaGoBack
                className="Task-icon_setTaskAsInProgress"
                onClick={this.onChangeStatusGoBack} />)}
            </div>
            <div className="TaskComponent-actionButton">
              {(status !== "Tasks done") && (<FaGoAhead
                className="Task-icon_setTaskAsInProgress"
                onClick={this.onChangeStatusGoAhead} />)}
            </div>
            <div className="TaskComponent-actionButton">
              <FaEdit
                className="Task-editTask"
                onClick={this.onEditTask} />
            </div>
            <div className="TaskComponent-actionButton">
              <FaTimes
                className="Task-removeTask"
                onClick={this.onRemoveTask} />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  onRemoveTask: (taskId) => dispatch(removeTask(taskId)),
  onEditTask: (taskName, taskId) => dispatch(editTask(taskName, taskId)),
  onAddWorkerToTask: (taskId, worker) => dispatch(editTaskWorker(taskId, worker)),
  onChangeStatus: (listId, taskId, status) => dispatch(setTaskStatus(listId, taskId, status)),
  onSendParamsToChangeStatus: (taskId) => dispatch(paramsToChangeStatus(taskId))
});

const mapStateToProps = (state) => ({
});

export const Task = connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
