import { envConstants } from 'core/constants';
import * as mockApi from './storage.mock';
import * as api from './storage.api';
import { StorageAPI } from './storage.contract';

export const storageApi: StorageAPI  = envConstants.isApiMock ? mockApi : api;