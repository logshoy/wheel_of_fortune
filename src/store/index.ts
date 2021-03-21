import { createStore, createLogger } from 'vuex'

// add localstorege vuex type typescript
import createPersistedState from 'vuex-persistedstate'

import {
  store as main,
  MainStore,
  State as MainState
} from '@/store/modules/main'

export type RootState = {
  main: MainState;
}

export type Store = MainStore<Pick<RootState, 'main'>>

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

// Plug in session storage based persistence
plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules: {
    main
  }
})

export function useStore (): Store {
  return store as Store
}

// export default createStore ({
//   namespaced: true,
//   state () {
//     return {
//       token: null
//     }
//   },
//   mutasion: {
//     setToken (state, token) {
//       state.token = token
//       localStorage.setItem('jwt-token', token)
//     },
//     removeToken (state) {
//       state.token = null
//       localStorage.removeItem('jwt-token')
//     }
//   },
//   action: {
//     async login ({ commit }, payload) {
//       commit('setToken', 'TEST-TOKEN')
//     }
//   },
//   getters: {
//     token (state) {
//       return state.token
//     },
//     isAuthenticated (_, getters) {
//       return !!getters.token
//     }
//   }
// })
