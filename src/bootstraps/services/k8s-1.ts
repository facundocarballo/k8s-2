import { K8S1Gateway } from "#app/ports/k8s-1/k8s-1.gateway";
import { K8S1Service } from "#infrastructure/services/k8s-1/k8s-1.service";

export class BootstrapK8S1Service {
    private static instance: K8S1Gateway;

    public static get(): K8S1Gateway {
        if (!this.instance) {
            this.instance = new K8S1Service();
        }
        return this.instance;
    }

    public static register(service: K8S1Gateway) {
        this.instance = service;
    }
}