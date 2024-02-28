import service from '@/utils/request'

export function getree() {
  return service({
    url:'/park/sys/permision/all/tree',
    method: 'GET',
  })
}
export function getrolell(roleId) {
  return service({
    url:`/park/sys/role/${roleId}`,
    method: 'GET',
  })
}
export function getsysuser(roleId,data) {
  return service({
    url:`/park/sys/roleUser/${roleId}`,
    method: 'GET',
    data
  })
}
export function addsysrole(data) {
  return service({
    url:'/park/sys/role',
    method: 'POST',
  })
}
