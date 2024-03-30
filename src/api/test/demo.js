import service from '@/utils/service';

export default {
  time() {
    return service({
      url: '/api/test/time',
      method: 'get',
    });
  },
};
