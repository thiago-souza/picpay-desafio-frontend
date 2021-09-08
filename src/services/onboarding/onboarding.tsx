import { IAuth } from "@/components/auth-context";
import { ApiService } from "../api";
import getRedirectUrl from "../navigation";

export const checkAuthIsInvalid = (authData: IAuth): boolean => {
  if (authData.token == null || authData.token == '') {
    console.log('Error on checking Auth is token is empty');
    return true;
  }

  if (authData.globoId == null || authData.globoId == '') {
    console.log('globoId is empty');
    return true;
  }

  return false;
}

export const checkGloboIdInWhitelist = async (apiService: ApiService): Promise<boolean> => {
  const promise = new Promise<boolean>(async (resolve, reject) => {
    let globoIdInWhiteList = null;

    try {
      globoIdInWhiteList = await apiService.IsGloboIdInExpressWhiteList();
    } catch (error) {
      console.log('Error on checking globo: ', error);
      return reject(error);
    }

    if (!globoIdInWhiteList.isMember) {
      return resolve(false);
    }

    return resolve(true);
  });

  return promise;
}

export const checkStatus = async (apiService: ApiService): Promise<string> => {
  const promise = new Promise<string>(async (resolve, reject) => {
    let statusResponse = null;

    try {
      statusResponse = await apiService.getStatus();
    } catch (error) {
      console.log('Error on checkin status: ', error);
      return reject(error);
    }

    console.log('status response: ', statusResponse);
    const url = getRedirectUrl('accounts/status', statusResponse.statusCode);
    if (url === 'status/') {
      if (statusResponse.data.status.toLowerCase() == 'in_process')
        return resolve(`${url}still_${statusResponse.data.status.toLowerCase()}`);
      else if (statusResponse.data.status.toLowerCase() == 'created')
        return resolve('select');
      else
        return resolve(`${url}${statusResponse.data.status.toLowerCase()}`);
    }
  });

  return promise;
}

