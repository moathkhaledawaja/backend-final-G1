import { User } from "../models";
import { IUserRepository } from "./Interfaces/IUserRepository";
import { RepositoryBase } from "./RepositoryBase";

export class UserRepository
  extends RepositoryBase<User>
  implements IUserRepository {}
