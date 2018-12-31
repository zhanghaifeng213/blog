import http from '@/libs/httpRequest'
export const getArticleList = id => {
  return http({
    url: http.adornUrl('/page/' + id),
    method: 'get'
  })
}

export const addArticle=(data)=>{
  return http({
    url: http.adornUrl('article'),
    method: 'post',
    data: data
  })
}