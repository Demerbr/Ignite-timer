import { produce } from 'immer'
import { actionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleID: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case actionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleID = action.payload.newCycle.id
      })
    case actionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleID: null,
      // }

      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleID = null
        draft.cycles[currentCyclesIndex].interruptedDate = new Date()
      })
    }
    case actionTypes.MARK_CURRENT_CYLCE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleID: null,
      // }
      const currentCyclesIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleID = null
        draft.cycles[currentCyclesIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}
