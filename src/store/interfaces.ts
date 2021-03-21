import { Mutations as mainMutations } from './modules/auth/mutations';
import { Mutations as authMutations } from './modules/main/mutations';
import { Mutations as requestMutations } from './modules/request/mutations';

export type AllMutations = {
  auth: authMutations;
  main: mainMutations;
  request: requestMutations;
}