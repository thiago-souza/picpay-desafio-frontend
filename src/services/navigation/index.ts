interface rotes {
  [endpoint: string]: any;
}

const mapRedirects: rotes = {
  'accounts/status': {
    200: 'status/',
    204: 'upload',
  },
  'accounts/attachments': {
    201: 'verify',
    202: 'verify',
    412: 'status/SUSPECTED',
    417: 'status/APPROVED',
    423: 'status/IN_PROCESS',
  },
  'accounts/verify': {
    200: 'status/APPROVED',
    201: 'status/IN_PROCESS',
    202: 'status/IN_PROCESS',
    409: 'upload',
    412: 'status/SUSPECTED',
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
