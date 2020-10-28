import { envConstants } from 'core/constants';
import * as mockApi from './user.mock';
import * as api from './user.repository';
import { UserRepository } from './user.contract';

export const userRepository: UserRepository = envConstants.isApiMock
  ? mockApi
  : api;
