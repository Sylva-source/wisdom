import service from '@/utils/request'

export function getuserinfo(params) {
  return service({
    url:'/park/sys/user',
    method: 'GET',
    params
  })
}
export function getrole(data) {
  return service({
    url:'/park/sys/role',
    method: 'GET',
    data
  })
}
export function addrole(data) {
  return service({
    url:'/park/sys/user',
    method: 'POST',
    data
  })
}
export function editrole(data) {
  return service({
    url:'/park/sys/user',
    method: 'PUT',
    data
  })
}
export function chong(data) {
  return service({
    url:'/park/sys/user/resetPwd',
    method: 'PUT',
    data
  })
}
export function delsys(id) {
  return service({
    url:`/park/sys/user/${id}`,
    method: 'DELETE',
  })
}
