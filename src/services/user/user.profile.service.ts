import { IuserProfileService } from "../../core/Interface/service/user/IUser.profile.service.ts";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { inject, injectable } from "inversify";
import { USER_NOT_FOUND } from "../../utils/errorMessages.ts";
import { IUser } from "../../core/Interface/Model/Iuser.model.ts";
import { singleUpload } from "../../utils/uploadCloudinary.ts";

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
    
    // Initialize weeklyLimitPic if it doesn't exist
    if (!user.weeklyLimitPic) {
      user.weeklyLimitPic = [];
    }
    
    user.weeklyLimitPic.push(image);
    await this._userRepo.update(id, { weeklyLimitPic: user.weeklyLimitPic });
    
    // Fetch updated user
    const updatedUser = await this._userRepo.findById(id);
    if (!updatedUser) throw new USER_NOT_FOUND();
    
    return updatedUser;
  }

  async updateCount(id: string, count: number): Promise<IUser> {
    const user = await this._userRepo.findById(id);
    if (!user) throw new USER_NOT_FOUND();
    
    // Calculate growth based on previous count
    const previousCount = user.currentCount || 0;
    let growth = 0;
    
    if (previousCount > 0) {
      // Calculate percentage growth
      growth = ((count - previousCount) / previousCount) * 100;
    } else if (count > 0) {
      // If previous count was 0 and new count is positive, set growth to 100%
      growth = 100;
    }
    
    await this._userRepo.update(id, {
      currentCount: count,
      growth: Math.round(growth * 10) / 10, // Round to 1 decimal place
    });
    
    // Fetch updated user
    const updatedUser = await this._userRepo.findById(id);
    if (!updatedUser) throw new USER_NOT_FOUND();
    
    return updatedUser;
  }
}
