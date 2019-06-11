import axios_tmt from './index'

export const userLogin = ({username, password}) => {
  return axios_tmt.request({
    url: '/api/user/authorization/',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

export const userInfo = () => {
  return axios_tmt.request({
    url: '/api/user/authorization/',
    method: 'get',
  })
}


export const userLogout = () => {
  return axios_tmt.request({
    url: '/api/user/authorization/',
    method: 'delete',
  })
}
