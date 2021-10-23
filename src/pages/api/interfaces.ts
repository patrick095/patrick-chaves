export interface IRateLimit {
    resources: {
        [key: string]: {
            limit: number;
            remaining: number;
            reset: number;
            used: number;
            resource: string;
        };
    };
    rate: {
        limit: number;
        remaining: number;
        reset: number;
        used: number;
        resource: string;
    };
}

export interface IGitError {
    response: {
        data: {
            message: string;
        };
    };
}
