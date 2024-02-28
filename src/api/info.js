import service from '@/utils/request'

export function getinfolist(params) {
  return service({
    url:'/pole/info/list',
    method: 'GET',
    params
  })
}
export function getguanlian() {
  return service({
    url:'/parking/area/dropList',
    method: 'GET',
  })
}
export function addinfo(data) {
  return service({
    url:'/pole/info',
    method: 'POST',
    data
  })
}
export function editinfo(data) {
  return service({
    url:'/pole/info',
    method: 'PUT',
    data
  })
}
export function delinfolist(ids) {
  return service({
    url:`/pole/info/${ids}`,
    method: 'DELETE',
  })
}
