export type Response<T> = {
    result: {
        code: number;
        message: string;
    };
    // context: {
    //     user: User;
    //     isLogin: boolean;
    // };
    body: T;
    page?: number;
    size?: number;
    total?: number;
    totalPages?: number;
};
