import {NetInfo, AppState} from 'react-native'

/**
 * Constants
 */
export const INITIALIZED = 'app/INITIALIZED'
export const CHANGE_NET_STATUS = 'app/CHANGE_NET_STATUS'
export const CHANGE_APP_STATE = 'app/CHANGE_APP_STATE'


/**
 * Reducer
 */

const initialState = {
  online: false,
  appState: null,
  fayeConnected: false
}

export default function app(state = initialState, action) {
  switch (action.type) {
  case INITIALIZED:
    // return {...state,
    //   online: action.netStatus
    // }
    return state

  case CHANGE_NET_STATUS:
    return {...state,
      online: action.payload
    }

  case CHANGE_APP_STATE:
    return {...state,
      appState: action.payload
    }

  default:
    return state
  }
}

 /**
 * Action Creators
 */

export function init() {
  return async (dispatch, getState) => {
    dispatch(setupAppStatusListener())
    try {
      // debugger
      // checking internet connection
      const netStatus = await NetInfo.getConnectionInfo()
      if (netStatus === 'none' || netStatus === 'NONE') {
        console.log(`netStatus ${netStatus}, should alert not network`);
        return
      }

      dispatch(setupNetStatusListener())
    } catch (error) {
      dispatch({ type: INITIALIZED, error: error.message })
    }
  }
}

function setupNetStatusListener() {
  return dispatch => {
    NetInfo.isConnected.addEventListener('connectionChange',
      async status => {
        dispatch({type: CHANGE_NET_STATUS, payload: status})
      }
    );
  }
}

function setupAppStatusListener() {
  return (dispatch, getState) => {
    AppState.addEventListener('change', async status => {
      // TODO: Update drawer rooms state and messages in current room
      // if app status changes from backgrount to active
      try {
        dispatch({type: CHANGE_APP_STATE, payload: status});
      } catch (error) {
        console.log(`setupAppStatusListener error ${error}`);
      }
    })
  }
}

