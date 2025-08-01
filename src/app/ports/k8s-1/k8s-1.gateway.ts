import { K8S1GetUserParams } from "./get-user/k8s-1-get-user.params";
import { K8S1GetUserResult } from "./get-user/k8s-1-get-user.result";

export interface K8S1Gateway {
    getUser(params: K8S1GetUserParams): Promise<K8S1GetUserResult>;
}