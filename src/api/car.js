import service from '@/utils/request'

export function getcarlist() {
  return service({
    url: '/parking/area/list',
    method: 'GET',
  })
}
export function addcar(data) {
  return service({
    url: '/parking/area',
    method: 'POST',
    data
  })
}
export function getguize() {
  return service({
    url: '/parking/rule/list',
    method: 'GET',
  })
}

export function editcar(data) {
  return service({
    url: '/parking/area',
    method: 'PUT',
    data
  })
}

export function deletecar(id) {
  return service({
    url:`/parking/area/${id}`,
    method: 'DELETE',
  })
}
export function gettinglist(params) {
  return service({
    url:'/parking/payment/list',
    method: 'GET',
    params
  })
}

export function getrulelist(params) {
  return service({
    url:'/parking/rule/list',
    method: 'GET',
    params
  })
}

export function addguize(data) {
  return service({
    url:'/parking/rule',
    method: 'POST',
    data
  })
}


export function editguize(data) {
  return service({
    url:'/parking/rule',
    method: 'PUT',
    data
  })
}
export function getxq(id) {
  return service({
    url:`/parking/rule/${id}`,
    method: 'GET',
  })
}
export function delcar(id) {
  return service({
    url:`/parking/rule/${id}`,
    method: 'DELETE',
  })
}
