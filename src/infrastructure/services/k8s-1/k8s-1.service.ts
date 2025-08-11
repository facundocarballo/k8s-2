import { K8S1GetUserParams } from "#app/ports/k8s-1/get-user/k8s-1-get-user.params";
import { K8S1GetUserResult, K8SGetUserNotFound, K8SGetUserResultOk } from "#app/ports/k8s-1/get-user/k8s-1-get-user.result";
import { K8S1Gateway } from "#app/ports/k8s-1/k8s-1.gateway";
import { K8S1ServiceException } from "#domain/exceptions/k8s-1.exception";
import axios, { AxiosError } from "axios";
import { K8S1GetUserResponseSchema } from "./responses/k8s-1-get-user-response.schema";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export class K8S1Service implements K8S1Gateway {
    public async getUser(params: K8S1GetUserParams): Promise<K8S1GetUserResult> {
        try {
             const response = await axios.get<string>(`http://k8s-1.microservices:8080/user/${params.userId}`);
             const responseBody = K8S1GetUserResponseSchema.parse(response.data);

             return new K8SGetUserResultOk(
                responseBody.username, 
                responseBody.password, 
                responseBody.id
             );
        } catch (err) {
            if (err instanceof AxiosError) {
                return this.handleAxiosError(err);
            }

            if (err instanceof ZodError) {
                return new K8S1ServiceException(err);
            }

            throw err;
        }
    }

    private handleAxiosError(err: AxiosError) {
        if (err.status === StatusCodes.NOT_FOUND) {
            return new K8SGetUserNotFound();
        }

        return new K8S1ServiceException(err);
    }
}