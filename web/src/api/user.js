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

export const upload = (data) => {
  return http({
    url: http.adornUrl('upload'),
    method: 'post',
    data: data
  })
}

