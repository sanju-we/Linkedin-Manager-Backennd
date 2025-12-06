
export interface IAdminAuthService {
  verifyLogin(data:{name:string,password:string}):Promise<{accessToken:string,refreshToken:string}>;
}