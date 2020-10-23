import { envConstants } from 'core/env.constants';
import * as mockApi from './storage.mock';
import * as api from './storage.api';

export const storageApi = envConstants.isApiMock ? mockApi : api;