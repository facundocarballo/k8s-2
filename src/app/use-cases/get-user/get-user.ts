import { UserNotFound } from "#app/exceptions/user-not-found";
import { K8S1GetUserParams } from "#app/ports/k8s-1/get-user/k8s-1-get-user.params";
import { K8SGetUserNotFound, K8SGetUserResultOk } from "#app/ports/k8s-1/get-user/k8s-1-get-user.result";
import { K8S1Gateway } from "#app/ports/k8s-1/k8s-1.gateway";
import { K8S1ServiceException } from "#domain/exceptions/k8s-1.exception";
import { User } from "#domain/user";
import { GetUserUseCaseInput } from "./get-user-input";
import { GetUserUsecaseOutput } from "./get-user.output";

export class GetUserUseCase {
  constructor(
    private readonly k8s1Gateway: K8S1Gateway
  ) {}

  public async execute(input: GetUserUseCaseInput): Promise<GetUserUsecaseOutput> {
    const params = new K8S1GetUserParams(input.id);
    const response = await this.k8s1Gateway.getUser(params);
    
    if (response instanceof K8SGetUserNotFound) {
      return new UserNotFound(input.id);
    }

    if (response instanceof K8S1ServiceException) {
      return response;
    }

    if (response instanceof K8SGetUserResultOk) {
      return new User(response.username, response.password, response.id);
    }

    throw new Error("Should not reach here! (Exhausitve)")
  }
}
