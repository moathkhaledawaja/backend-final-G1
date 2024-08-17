import WishlistService from '../services/wishList.service';
import { WishlistRepository } from '../data-access/WishListRepository';
import { WishlistDTO } from '../Types/DTO/wishlistDto';
import { mock, MockProxy } from 'jest-mock-extended';
import { Wishlist } from '../models';

jest.mock('../models/Wishlist.model.ts');

describe('WishlistService', () => {
  let wishlistService: WishlistService;
  let wishlistRepository: MockProxy<WishlistRepository>;

  beforeEach(() => {
    wishlistRepository = mock<WishlistRepository>();
    wishlistService = new WishlistService();
  });

  describe('getWishlistByUserId', () => {
    it('should return a wishlist for a given userId', async () => {
      const userId = 1;
      const wishlist = new Wishlist();
      wishlist.products = [];

      wishlistRepository.findByUserId.mockResolvedValue(wishlist);

      const result = await wishlistService.getWishlistByUserId(userId);

      expect(wishlistRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(wishlist);
    });

    it('should return null if no wishlist is found', async () => {
      const userId = 1;

      wishlistRepository.findByUserId.mockResolvedValue(null);

      const result = await wishlistService.getWishlistByUserId(userId);

      expect(result).toBeNull();
    });

    it('should throw an error if there is an issue retrieving the wishlist', async () => {
      const userId = 1;

      wishlistRepository.findByUserId.mockRejectedValue(new Error('Database error'));

      await expect(wishlistService.getWishlistByUserId(userId)).rejects.toThrow(
        'Error retrieving the wishlist: Database error'
      );
    });
  });

  describe('addProductToWishlist', () => {
    it('should return true if the product is successfully added', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.addProductToWishlist.mockResolvedValue(true);

      const result = await wishlistService.addProductToWishlist(userId, productId);

      expect(wishlistRepository.addProductToWishlist).toHaveBeenCalledWith(userId, productId);
      expect(result).toBe(true);
    });

    it('should return false if the product cannot be added', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.addProductToWishlist.mockResolvedValue(false);

      const result = await wishlistService.addProductToWishlist(userId, productId);

      expect(result).toBe(false);
    });

    it('should throw an error if there is an issue adding the product', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.addProductToWishlist.mockRejectedValue(new Error('Database error'));

      await expect(wishlistService.addProductToWishlist(userId, productId)).rejects.toThrow(
        'Error Adding the product: Database error'
      );
    });
  });

  describe('clearWishList', () => {
    it('should return true if the wishlist is successfully cleared', async () => {
      const userId = 1;

      wishlistRepository.clearWishList.mockResolvedValue(true);

      const result = await wishlistService.clearWishList(userId);

      expect(wishlistRepository.clearWishList).toHaveBeenCalledWith(userId);
      expect(result).toBe(true);
    });

    it('should return false if the wishlist cannot be cleared', async () => {
      const userId = 1;

      wishlistRepository.clearWishList.mockResolvedValue(false);

      const result = await wishlistService.clearWishList(userId);

      expect(result).toBe(false);
    });

    it('should throw an error if there is an issue clearing the wishlist', async () => {
      const userId = 1;

      wishlistRepository.clearWishList.mockRejectedValue(new Error('Database error'));

      await expect(wishlistService.clearWishList(userId)).rejects.toThrow(
        'clearing the wishlist: Database error'
      );
    });
  });

  describe('removeProductFromWishList', () => {
    it('should return true if the product is successfully removed', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.removeProductFromWishList.mockResolvedValue(true);

      const result = await wishlistService.removeProductFromWishList(userId, productId);

      expect(wishlistRepository.removeProductFromWishList).toHaveBeenCalledWith(userId, productId);
      expect(result).toBe(true);
    });

    it('should return false if the product cannot be removed', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.removeProductFromWishList.mockResolvedValue(false);

      const result = await wishlistService.removeProductFromWishList(userId, productId);

      expect(result).toBe(false);
    });

    it('should throw an error if there is an issue removing the product', async () => {
      const userId = 1;
      const productId = 123;

      wishlistRepository.removeProductFromWishList.mockRejectedValue(new Error('Database error'));

      await expect(wishlistService.removeProductFromWishList(userId, productId)).rejects.toThrow(
        'Error removing the product: Database error'
      );
    });
  });
});
