import { UserNotFound } from "#app/exceptions/user-not-found";
import { Controller } from "#app/ports/controller";
import { GetUserRequest } from "#app/schemas/get-user";
import { GetUserUseCase } from "#app/use-cases/get-user/get-user";
import { GetUserUseCaseInput } from "#app/use-cases/get-user/get-user-input";
import { K8S1ServiceException } from "#domain/exceptions/k8s-1.exception";
import { User } from "#domain/user";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export class GetUserController implements Controller {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = GetUserRequest.parse(req.params);
      const input = new GetUserUseCaseInput(id);
      const output = await this.getUserUseCase.execute(input);
      
      if (output instanceof User) {
        res.status(StatusCodes.OK).send(output);
        return
      }

      if (output instanceof UserNotFound) {
        res.status(StatusCodes.NOT_FOUND).send(output);
        return
      }

      if (output instanceof K8S1ServiceException) {
        res.status(StatusCodes.BAD_GATEWAY).send(output);
      }

    } catch (err) {
      // Esto deberia de ser controlado por un middleware
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Unexpected error." });
    }
  }
}
