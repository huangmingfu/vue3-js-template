import service from '@/utils/service';

// xxx
export function getHome(params) {
  return service({
    method: 'POST',
    url: 'get/home',
    params,
  })
    .then((res) => res.data)
    .catch((e) => e);
}
