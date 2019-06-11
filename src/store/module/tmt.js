import {tmtGetProduct, tmtGetProject, tmtCreateBug, tmtGetUser} from '@/api/tmt'

const state = {
  products: [],
  projects: [],
  users: [],
  form: {},
  files: [],
  device_info: {},
}

const getters = {
  products: (state) => {
    return state.products
  },
  projects: (state) => {
    return state.projects
  },
  users: (state) => {
    return state.users
  },
  form: (state) => {
    return state.form
  },
  files: (state) => {
    return state.files
  },
  device_info: (state) => {
    return state.device_info
  }
}

const mutations = {
  update_form(state, form) {
    state.form = form
  },
  splice_files(state, index) {
    state.files.splice(index, 1)
  },
  push_files(state, files) {
    state.files.push(files)
  },
  update_device_info(state, device_info) {
    state.device_info = device_info
  },
  clear_bug_data(state) {
    state.form.steps = "<p>[步骤]</p><br /><br /><p>[结果]</p><br /><br /><p>[期望]</p><br /><br />";
    state.form.title = "";
    state.form.title_pre = "";
    state.files = [];
    state.device_info = {};
  }
}

const actions = {

  getProducts({commit}) {
    tmtGetProduct().then(res => {
      if (res.data.status) {
        state.products = res.data.data
      }
    })
  },

  getProjects({commit}, {id}) {
    tmtGetProject({id}).then(res => {
      if (res.data.status) {
        state.projects = res.data.data
      }
    })
  },

  getUsers({commit}) {
    tmtGetUser().then(res => {
      if (res.data.status) {
        state.users = res.data.data
      }
    })
  },

  createBug({commit}) {
    return new Promise((resolve, reject) => {
      tmtCreateBug({form: state.form, files: state.files, device_info: state.device_info}).then(res => {
        if (res.data.status) {
          commit("clear_bug_data");
          resolve(res)
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
