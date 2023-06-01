import request from '@/utils/request'
let baseUrl = 'http://127.0.0.1:3000'
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function getComics() {
  return request({
    url: baseUrl + '/comics/',
    method: 'get'
  })
}
export function getTypes() {
  return request({
    url: baseUrl + '/comics/allType/',
    method: 'get'
  })
}
export function delComic(id) {
  return request({
    url: baseUrl + '/comics/' + id,
    method: 'delete'
  })
}
export function delType(id) {
  return request({
    url: baseUrl + '/comics/delType/' + id,
    method: 'delete'
  })
}
export function editComic(id, data) {
  return request({
    url: baseUrl + '/comics/update/' + id,
    method: 'post',
    data: data
  })
}
export function addType(data) {
  return request({
    url: baseUrl + '/comics/addType/',
    method: 'post',
    data: data
  })
}
export function editType(id, data) {
  return request({
    url: baseUrl + '/comics/editType/' + id,
    method: 'post',
    data: data
  })
}

