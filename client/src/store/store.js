
export const state = {
  isSuccess : false,
  isError : false,
  isLogin : localStorage.getItem('token') || null
}

export const getters = {
  getSuccess(state) {
    return state.isSuccess
  },
  getError(state) {
    return state.isError
  }
}

export const mutations = {
  SET_ISSUCCESS(state, value) {
    state.isSuccess = value
  },
  SET_ISERROR(state, value) {
    state.isError = value
  },
  IF_LOGIN(state) {
    
  }
}

export const actions = {
  setSuccess({commit}, value) {
    commit('SET_ISSUCCESS', value)
  },
  setError({commit}, value) {
    commit('SET_ISERROR', value)
  }
}