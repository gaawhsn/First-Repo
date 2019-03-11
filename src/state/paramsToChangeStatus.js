const CHANGE_PARAMS = 'change-params';

export const paramsToChangeStatusToDoReducer = (state = ["trololo"], action) => {
  const {type, taskId} = action;

  switch(type){
    case CHANGE_PARAMS:
      return  taskId;
    default:
      return state;
    }
};

export const paramsToChangeStatus = (taskId) => ({
  type: CHANGE_PARAMS,
  taskId,
});
