import http from '@/libs/httpRequest'
export const getArticleList = id => {
  return http({
    url: http.adornUrl('/page/' + id),
    method: 'get'
  })
}