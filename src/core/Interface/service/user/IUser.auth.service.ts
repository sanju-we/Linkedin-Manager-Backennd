
export interface IUserAUthService {
  verify(data:{email:string,password:string}):Promise<void>;
}