
import {database as fire} from '../firebaseConfig';
import C from '../constants';
var worksRef = fire.database().ref('works').orderByKey().limitToLast(100);

const startListeningToWorks = () => {
  return function(dispatch,getState){
			worksRef.on("value",function(snapshot){
        dispatch({ type: C.RECEIVE_WORKS_DATA, data: snapshot.val() });
			});
		}
}

const startWorkEdit = (qid) => {
		return {type:C.START_WORK_EDIT,qid};
}

const cancelWorkEdit = (qid) => {
		return {type:C.FINISH_WORK_EDIT,qid};
}
const deleteWork = (qid) => {
  var error = false;
		return function(dispatch,getState){
      dispatch({type:C.SUBMIT_WORK_EDIT,qid});
      fire.database().ref('works').child(qid).remove();
    };
}
const submitWorkEdit = (qid, content) => {
		return function(dispatch,getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
      var error = false; //utils.validateWork(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.SUBMIT_WORK_EDIT,qid});
        fire.database().ref('works').child(qid).update( content );

			}
		}
}

const submitNewWork = (content) => {
  console.log(content);
  return function(dispatch, getState){
      /*var state = getState(),
				username = state.auth.username,
        uid = state.auth.uid,*/
    var error = false; //utils.validateWork(content);
			if (error){
				dispatch({type:C.DISPLAY_ERROR,error});
      } else {
        dispatch({type:C.AWAIT_NEW_WORK_RESPONSE});
        fire.database().ref('works').push( content ),function(error){
					dispatch({type:C.RECEIVE_NEW_WORK_RESPONSE});
					if (error){
						dispatch({type:C.DISPLAY_ERROR,error:"Submission failed! "+error});
					} else {
						dispatch({type:C.DISPLAY_MESSAGE,message:"Submission successfully saved!"});
					}
        }
			}
		}

		}


export default {startListeningToWorks, startWorkEdit, cancelWorkEdit, submitWorkEdit, deleteWork, submitNewWork};
