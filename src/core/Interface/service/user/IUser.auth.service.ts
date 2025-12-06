
export interface IUserAUthService {
  verify(data:{name:string,password:string}):Promise<{accessToken:string,refreshToken:string}>;
}