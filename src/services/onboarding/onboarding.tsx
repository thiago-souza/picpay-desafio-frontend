import { IAuth } from "@/components/auth-context";
import { ApiService } from "../api";

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
      //history.push('/status/error');
      return reject(error);
    }

    if (!globoIdInWhiteList.isMember) {
      //const cartolaURL = process.env.CARTOLA_URL || '';
      //window.location.href = cartolaURL;
      //return false;
      return resolve(false);
    }

    //return true
    return resolve(true);
  })

  return promise;
}

