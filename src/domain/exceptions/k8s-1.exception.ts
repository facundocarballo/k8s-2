export class K8S1ServiceException {
    public readonly type = 'K8S1ServiceException';

    constructor(
        public readonly cause: Error
    ) {}
}