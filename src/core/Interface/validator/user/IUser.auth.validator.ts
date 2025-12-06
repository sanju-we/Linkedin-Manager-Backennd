
export interface IAuthValidator {
  authValidator(data:{email:string,password:string}):Promise<void>
}