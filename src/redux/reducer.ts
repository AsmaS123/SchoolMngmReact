const initialState = {
    token: '',
    permission:[]
  };

  const initialtimetable = {
    name:'',
    teacher_id:'',
    classroom_id:'',
    grade:'',
    section:'',
    timetable_id:'',
    day:'',
    time:'',
    subject:''
  }

  export const rootReducer = (state = initialState, action: { type: any; payload:any }) => {
// debugger
    switch (action.type) {
      case 'login':
        // debugger
        return {
          ...state,
          token: action.payload.token, permission: action.payload.permission
        };
      case 'logout':
        return {
          ...state,
          token: '', permission: []
        };
      default:
        return state;
    }
  };

  export const timetablereducer = (state=initialtimetable, action: { type: any; payload:any }) => {
    // debugger
    switch (action.type) {
      case 'viewtimetable':
        // debugger
        return {
          ...state,
          ...action.payload
        };
        default:
        return state;
    }
  }

  export const attendanceReducer = (state={}, action: { type: any; payload:any }) => {
    // debugger
    switch (action.type) {
      case 'attendance':
        // debugger
        return {
          ...state,
          ...action.payload
        };
        default:
        return state;
    }
  }
  
  // export default rootReducer;