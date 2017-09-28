import axios from 'axios';

// Here additional configs, transformers, headers etc can be specified
export default axios.create({
   responseType: 'json',
   headers: { 'X-Auth-Token': 'h3r3y0uc-4n5p3c1f-y4n4u7h3-n71c4t10-nt0k3n' },
   withCredentials: true,
   // transformRequest:
   // transformResponse:
});
