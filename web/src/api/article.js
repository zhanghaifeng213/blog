import http from '@/libs/httpRequest'
export const getArticleList = id => {
  return http({
    url: http.adornUrl('page/' + id),
    method: 'get'
  })
}

export const addArticle = data => {
  return http({
    url: http.adornUrl('article'),
    method: 'post',
    data: data
  })
}

export const getCommentList = id => {
  return http({
    url: http.adornUrl('article/' + id),
    method: 'get'
  })
}

export const addComment = data => {
  return http({
    url: http.adornUrl('comment'),
    method: 'post',
    data: data
  })
}
