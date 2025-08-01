import { UserNotFound } from "#app/exceptions/user-not-found";
import { K8S1ServiceException } from "#domain/exceptions/k8s-1.exception";
import { User } from "#domain/user";

export type GetUserUsecaseOutput = |
User | 
UserNotFound |
K8S1ServiceException