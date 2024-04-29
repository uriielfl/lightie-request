export class LightieError {
    constructor(
        public status: number,
        public statusText: string = 'No status text provided',
        public message: any = 'No message provided',
    ) {}
}