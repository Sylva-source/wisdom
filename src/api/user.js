import service from '@/utils/request'

export function loginApi(data) {
  return service({
    url: '/park/login',
    method: 'POST',
    data
  })
}
export function getProfileApi() {
  return service({
    url: '/park/user/profile',
    method: 'GET'
  })
}
export function getlouyu(params) {
  return service({
    url: '/park/building',
    method: 'GET',
    params
  })
}
export function getqiye(params) {
  return service({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
export function addlouyu(data) {
  return service({
    url: '/park/building',
    method: 'POST',
    data
  })
}
export function editlouyu(data) {
  return service({
    url: '/park/building',
    method: 'PUT',
    data
  })
}
export function deletemit(id) {
  return service({
    url: `/park/building/${id}`,
    method: 'DELETE',
  })
}
export function delqiy(id) {
  return service({
    url: `/park/enterprise/${id}`,
    method: 'DELETE',
  })
}
export function chakan(id) {
  return service({
    url: `/park/enterprise/${id}`,
    method: 'GET',
  })
}
export function addqiye(data) {
  return service({
    url: 'park/enterprise',
    method: 'POST',
    data
  })
}
export function editqy(data) {
  return service({
    url: '/park/enterprise',
    method: 'PUT',
    data
  })
}
export function indus() {
  return service({
    url: '/park/industry',
    method: 'GET',
  })
}
export function getlouyua() {
  return service({
    url: '/park/rent/building',
    method: 'GET',
  })
}
export function getshangchaun(data) {
  return service({
    url: '/upload',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export function addrent(data) {
  return service({
    url: '/park/enterprise/rent',
    method: 'POST',
    data,
    // headers: { 'Content-Type': 'multipart/form-data' }
  })
}
