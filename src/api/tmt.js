import {axios_tmt} from './index'
import axios from "./index";

export const tmtGetProduct = () => {
  return axios_tmt.request({
    url: '/api/tmt/product/',
    method: 'get'
  })
}

export const tmtGetProject = ({id}) => {
  return axios_tmt.request({
    url: '/api/tmt/product/' + id + '/project/',
    method: 'get'
  })
}


export const tmtGetUser = () => {
  return axios_tmt.request({
    url: '/api/tmt/user/',
    method: 'get'
  })
}


export const tmtCreateBug = ({form, files, device_info}) => {
  let data = form;
  data['files'] = files;
  data['device_info'] = device_info;
  return axios_tmt.request({
    url: '/api/tmt/bug/',
    method: 'post',
    data: data,
  })

}


export const tmtGetAppHistory = () => {
  return axios_tmt.request({
    url: '/api/tmt/apphistory/',
    method: 'get'
  })
}


export const tmtGetiOSDevice = () => {
  return axios_tmt.request({
    url: '/api/ios/device/',
    method: 'get'
  })
}


export const tmtiOSDeviceScreenshot = (uuid) => {
  return axios_tmt.request({
    url: '/api/ios/device/screenshot/' + uuid + '/',
    method: 'post'
  })
}

export const tmtiOSDeviceLogCat = (uuid, action) => {
  return axios_tmt.request({
    url: '/api/ios/device/logcat/' + uuid + '/',
    method: 'post',
    data: {"action": action},
  })
}