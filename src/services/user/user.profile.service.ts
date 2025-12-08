import { IuserProfileService } from "../../core/Interface/service/user/IUser.profile.service";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty";
import { inject, injectable } from "inversify";
import { USER_NOT_FOUND } from "../../utils/errorMessages";
import { IUser } from "../../core/Interface/Model/Iuser.model";
import { singleUpload } from "../../utils/uploadCloudinary";

@injectable()
export class userProfileService implements IuserProfileService {
  constructor(
    @inject('IUserRepository') private readonly _userRepo: IUserRepository
  ) { }
  
  async getProfile(id: string): Promise<IUser> {
    const user = await this._userRepo.findById(id);
    if (!user) throw new USER_NOT_FOUND();
    return user;
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<IUser> {
    const user = await this._userRepo.findById(id);
    if (!user) throw new USER_NOT_FOUND();
    
    const image = await singleUpload(file, 'LINKEDIN_MANAGEMENT');
    
    if (!user.weeklyLimitPic) {
      user.weeklyLimitPic = [];
    }
    
    user.weeklyLimitPic.push(image);
    await this._userRepo.update(id, { weeklyLimitPic: user.weeklyLimitPic });
    
    const updatedUser = await this._userRepo.findById(id);
    if (!updatedUser) throw new USER_NOT_FOUND();
    
    return updatedUser;
  }

  async updateCount(id: string, count: number): Promise<IUser> {
    const user = await this._userRepo.findById(id);
    if (!user) throw new USER_NOT_FOUND();
    
    const previousCount = user.currentCount || 0;
    let growth = 0;
    
    if (previousCount > 0) {
      growth = ((count - previousCount) / previousCount) * 100;
    } else if (count > 0) {
      growth = 100;
    }
    
    await this._userRepo.update(id, {
      previousCount : previousCount,
      currentCount: count,
      growth: Math.round(growth * 10) / 10, 
    });
    
    // Fetch updated user
    const updatedUser = await this._userRepo.findById(id);
    if (!updatedUser) throw new USER_NOT_FOUND();
    
    return updatedUser;
  }
}
