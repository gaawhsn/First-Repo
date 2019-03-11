import React, { PureComponent } from 'react';
import 'normalize.css/normalize.css';
import '../../App.scss';
import { Lists } from '../lists';
import { connect} from 'react-redux';
import { createNewList } from '../../state/lists';
import { fetchTasks } from '../../state/tasks';

class BoardWithAllListsComponent extends PureComponent {
  constructor(props){
    super(props);
      this.state = {
        editTitle: false
    };
  }

  componentDidMount = () => {
    this.props.fetchTasks();
  }

  render() {

    const { lists } = this.props;
    console.log(lists);

    return (
      <div className="App">
        <div className="board-with-lists">
          {lists.map((list)  =>
            <div className="App-listsContent"
            key={list.id}>
            <Lists
              title={list.title}
              day={list.day}
              month={list.month}
              year={list.year}
              idOfLists={list.id}
              owner={list.owner}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists.lists
});

const mapDispatchToProps = {
  fetchTasks
}

export const BoardWithAllLists = connect(mapStateToProps, mapDispatchToProps)(BoardWithAllListsComponent);
