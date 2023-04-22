import { KeyWorkerClusterManager } from 'key-manager';
import { getContext, setContext } from 'svelte';
import { KeysService, UsernameService } from '../services';
import { SessionApiService, UserApiService } from '../api';

export interface Services {
  // API
  sessionApiService: SessionApiService;
  userApiService: UserApiService;

  keysService: KeysService;
  usernameService: UsernameService;
}

export function initServices(): Services {
  const sessionApiService = new SessionApiService();

  const services: Services = {
    // API
    sessionApiService,
    userApiService: new UserApiService(),

    keysService: new KeysService(new KeyWorkerClusterManager(), sessionApiService),
    usernameService: new UsernameService(),
  };

  setContext('services', services);

  // eslint-disable-next-line no-console
  console.log('Services initialised');

  return services;
}

export function getServices(): Services {
  return getContext('services');
}
