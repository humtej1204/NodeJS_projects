export interface IEnvironments {
    app: {
        port: number;
        name: string;
        maxFileSize: string;
    };
    db: {
        port: number;
        host: string;
        user: string;
        pass: string;
        name: string;
        time: string;
        dialect: string;
        pool: {
            min: number;
            max: number;
        }
    };
    jwt: {
        secret: string;
        exp: string;
    };
    stage: string;
    logging: boolean;
}