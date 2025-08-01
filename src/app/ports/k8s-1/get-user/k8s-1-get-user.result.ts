import { K8S1ServiceException } from "#domain/exceptions/k8s-1.exception";

export type K8S1GetUserResult = |
K8SGetUserResultOk |
K8SGetUserNotFound |
K8S1ServiceException;

export class K8SGetUserResultOk {
    public readonly type = 'K8SGetUserResultOk';

    constructor(
        public readonly username: string,
        public readonly password: string,
        public readonly id: string
    ) {}
}

export class K8SGetUserNotFound {
    public readonly type = 'K8SGetUserNotFound'
}