import service from '@/utils/service';

export function getHome(params) {
  return service({
    method: 'get',
    url: 'get/home',
    params,
  })
    .then((res) => res.data)
    .catch((e) => e);
}
