import { GetUserUseCase } from "#app/use-cases/get-user/get-user";
import { BootstrapK8S1Service } from "#bootstraps/services/k8s-1";

export class BootstrapGetUserUseCase {
    private static instance: GetUserUseCase;

    public static get(): GetUserUseCase {
        if (!this.instance) {
            const k8s1Service = BootstrapK8S1Service.get();
            this.instance = new GetUserUseCase(k8s1Service);
        }
        return this.instance;
    }

    public static register(usecase: GetUserUseCase) {
        this.instance = usecase;
    }
}