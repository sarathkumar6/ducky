import React, { useReducer } from 'react';
import ActivityContext from './activityContext';
import activityReducer from './activityReducer';
import axios from 'axios';
import {
	ADD_ACTIVITY,
	DELETE_ACTIVITY,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_ACTIVITY,
	FILTER_ACTIVITIES,
	CLEAR_FILTER,
	ACTIVITY_ERROR,
	DELETE_ERROR,
	GET_ACTIVITIES,
	CLEAR_ACTIVITIES
} from '../types';

const ActivityState = (props) => {
	const initialState = {
		activities: null,
		current: null,
		filtered: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(activityReducer, initialState);

	// GET ACTIVITIES
	const getActivities = async () => {
		try {
			const response = await axios.get('/api/clients/activities');
			dispatch({ type: GET_ACTIVITIES, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// POST ACTIVITY
	const addActivity = async (activity) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post('/api/clients/activities', activity, config);
			dispatch({ type: ADD_ACTIVITY, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// PUT ACTIVITY
	const updateActivity = async (activity) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.put(`/api/clients/activities/${activity.id}`, activity, config);
			dispatch({ type: UPDATE_ACTIVITY, payload: response.data });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// DELETE ACTIVITY
	const deleteActivity = async (id) => {
		try {
			await axios.delete(`/api/clients/activities/${id}`);
			dispatch({ type: DELETE_ACTIVITY, payload: id });
		} catch (error) {
			dispatch({ type: ACTIVITY_ERROR, payload: error.response.message });
		}
	};

	// SET CURRENT ACTIVITY
	const setCurrent = (activity) => {
		dispatch({ type: SET_CURRENT, payload: activity });
	};

	// CLEAR CURRENT ACTIVITY
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// CLEAR ACTIVITIES
	const clearActivities = () => {
		dispatch({ type: CLEAR_ACTIVITIES });
	};

	return (
		<ActivityContext.Provider
			value={{
				activities: state.activities,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addActivity,
				deleteActivity,
				setCurrent,
				clearCurrent,
				updateActivity,
				getActivities,
				clearActivities
			}}>
			{props.children}
		</ActivityContext.Provider>
	);
};

export default ActivityState;
