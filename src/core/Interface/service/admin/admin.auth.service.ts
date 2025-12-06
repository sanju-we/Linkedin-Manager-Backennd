
export interface IAdminAuthService {
  verifyLogin(data:{email:string,password:string}):Promise<{accessToken:string,refreshToken:string}>;
}