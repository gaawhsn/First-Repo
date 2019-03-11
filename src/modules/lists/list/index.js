import React, {PureComponent} from 'react';
import {Tasks} from '../../tasks';
import './style.scss';

export class List extends PureComponent {

	render(){

		const  {title, id} = this.props;

		return(
			<div className="container-with-tasks">
				<div className="List-info">
					<div className="List-title">{title} </div>
				</div>
				{(title ==="Tasks to do") && (
					<Tasks listId={id} title={title}/>)}
				{(title ==="Tasks in progress") && (
					<Tasks listId={id} title={title}/>)}
				{(title ==="Tasks done") && (
					<Tasks listId={id} title="Tasks done"/>)}
			</div>
  )};
}
