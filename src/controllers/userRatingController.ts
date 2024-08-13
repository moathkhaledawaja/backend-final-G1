
import { UserRatingService } from '../services/userRating.service';
import { UserRatingDTO } from '../DTO';
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class UserRatingController {
  constructor(@inject(UserRatingService) private userRatingService: UserRatingService,
  ) {
  }

  public async createUserRating(req: Request, res: Response): Promise<UserRatingDTO | null> {
    try {
      const id = parseInt(req.params.id);
      const userRatingData: UserRatingDTO = req.body;
      const userId = (req as any).user.id;
      const userRating = await this.userRatingService.createUserRating(userId, id, userRatingData);
      if (!userRating) {
        res.status(404);
        // to be implemented
        throw new Error('User Rating not found');
      }
      return userRating;
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }

  public async updateUserRating(req: Request, res: Response): Promise<UserRatingDTO | null> {
    try {
      const id = parseInt(req.params.id);
      const userRatingData: UserRatingDTO = req.body;
      const userId = (req as any).user.id;
      const userRating = await this.userRatingService.updateUserRating(userId, id, userRatingData);
      if (!userRating) {
        res.status(404);
        // to be implemented
        throw new Error('User Rating not found');
      }
      return userRating;
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }


  public async findByUserIdAndProductId(req: Request, res: Response): Promise<UserRatingDTO | null> {
    try {
      const id = parseInt(req.params.id);

      const userId = (req as any).user.id;
      const userRating = await this.userRatingService.findUserRatingByUserIdAndProductId(id, userId);
      res.status(204);
      return userRating;
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
}
