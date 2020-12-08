import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ActivityContext from '../../context/activity/activityContext';
import ActivityItem from '../activities/ActivityItem';

const Activities = ({ displayEditAndDelete }) => {
	const activityContext = useContext(ActivityContext);
	const { activities, getActivities } = activityContext;

	useEffect(() => {
		getActivities();
		//eslint-disable-next-line
	}, []);

	if (!activities) {
		return <h4>Pleae add a activity</h4>;
	} else {
		return (
			<Fragment>
				<TransitionGroup>
					<div className='title'>Activities</div>
					{activities.map((activity) => (
						<CSSTransition key={activity._id} timeout={500} classNames='item'>
							<ActivityItem
								clientName={activity.clientName}
								food={activity.food}
								foodQuantity={activity.foodQuantity}
								id={activity._id}
								foodType={activity.foodType}
								country={activity.country}
								date={activity.date}
								numberOfDucks={activity.numberOfDucks}
								displayEditAndDelete={displayEditAndDelete}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</Fragment>
		);
	}
};
export default Activities;
