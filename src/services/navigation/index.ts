interface rotes {
  [endpoint: string]: any;
}

const mapRedirects: rotes = {
  'accounts/status': {
    200: 'status/',
    201: 'upload',
    204: 'upload',
  },
  'accounts/attachments': {
    201: 'verify',
    202: 'verify',
    412: 'status/suspected',
    417: 'status/approved',
    423: 'status/in_process',
  },
  'accounts/verify': {
    200: 'status/approved',
    201: 'status/in_process',
    202: 'status/in_process',
    409: 'upload',
    412: 'status/suspected',
    417: 'upload',
  },
};

export default function getRedirectUrl(
  endpoint: string,
  status: number,
): string {
  const url = mapRedirects[endpoint][status];
  return url ? url : 'status/error';
}
