import { IAuth } from "@/components/auth-context";
import getRedirectUrl from "../navigation";

export const checkAuthIsInvalid = (authData: IAuth): boolean => {
  if (!authData.token) {
    return true;
  }

  if (!authData.globoId) {
    return true;
  }

  return false;
}

export const getPageFromStatus = (statusCode: number, statusResponse: string): string => {
  const url = getRedirectUrl('accounts/status', statusCode);

  if (url === 'status/') {
    if (statusResponse.toLowerCase() == 'in_process')
      return `${url}still_${statusResponse.toLowerCase()}`;
    else if (statusResponse.toLowerCase() == 'created')
      return '/';
    else
      return `${url}${statusResponse.toLowerCase()}`;
  } else {
    return url;
  }
}

