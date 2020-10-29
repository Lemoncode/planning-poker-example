import { envConstants } from 'core/constants';
import * as mockRepository from './user.mock';
import * as repository from './user.repository';
import { UserRepository } from './user.contract';

export const userRepository: UserRepository = envConstants.isMockRepository
  ? mockRepository
  : repository;
