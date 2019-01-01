import http from '@/libs/httpRequest'

export const reg = (data) => {
  return http({
    url: http.adornUrl('user/reg'),
    method: 'post',
    data: data
  })
}

export const login = (data) => {
  return http({
    url: http.adornUrl('user/login'),
    method: 'post',
    data: data
  })
}

export const info = (data) => {
  return http({
    url: http.adornUrl('user/info'),
    method: 'get',
    data: data
  })
}

export const logout = () => {
  return http({
    url: http.adornUrl('/user/logout'),
    method: 'get',
  })
}


export const getUserInfo = userName => {
  const userdata = new FormData()
  userdata.append('loginName', userName)
  return http({
    url: http.adornUrl('sys/getUserMessage'),
    data: userdata,
    method: 'post'
  })
}

export const addUser = data => {
  return http({
    url: http.adornUrl('sys/addUser'),
    method: 'post',
    data: data
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
