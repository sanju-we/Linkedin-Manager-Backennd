
export interface IAuthValidator {
  authValidator(data:{name:string,password:string}):Promise<void>;
  userValidator(data:{name:string,password:string,linkedAcc:string}):Promise<void>;
}