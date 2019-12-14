import { combineReducers } from 'redux'
import repository from './repository'
import commit from './commit'

const rootReducer = combineReducers({
  repository,
  commit
})

export default rootReducer
