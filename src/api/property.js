
import service from '@/utils/request'

export function getenter() {
  return service({
    url:'/park/all/enterprise',
    method: 'GET',
  })
}
export function getproper(params) {
  return service({
    url:'/park/propertyfee',
    method: 'GET',
    params
  })
}
export function getbuil() {
  return service({
    url:'/park/all/building',
    method: 'GET',
  })
}
export function yusuanmoney(data) {
  return service({
    url:'/park/propertyfee/pre/payment',
    method: 'POST',
    data
  })
}
export function addpro(data) {
  return service({
    url:'/park/propertyfee',
    method: 'POST',
    data
  })
}
export function delproper(id) {
  return service({
    url:`/park/propertyfee/${id}`,
    method: 'DELETE',
  })
}
