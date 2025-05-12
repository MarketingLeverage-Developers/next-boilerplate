import { ApiError, ForbiddenError, NotFoundError, ServerError, UnauthorizedError } from './errors';

type ParamsObject = Record<string, string | number | boolean | string[] | undefined>;

class FetchAPI {
    private baseURL: string;
    private headers: Record<string, string>;

    private static instance: FetchAPI;

    private constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_API_URL ?? '/api';
        this.headers = {};
    }

    public static getInstance(): FetchAPI {
        if (!FetchAPI.instance) {
            FetchAPI.instance = new FetchAPI();
        }
        return FetchAPI.instance;
    }

    public setBaseURL(url: string): void {
        this.baseURL = url;
    }

    public setDefaultHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    private buildUrl(endpoint: string, path?: ParamsObject, query?: ParamsObject): string {
        let url = endpoint;
        // Interpolate path params (e.g. /users/:id)
        if (path) {
            for (const [key, val] of Object.entries(path)) {
                url = url.replace(new RegExp(`:${key}(?=/|$)`, 'g'), encodeURIComponent(String(val)));
            }
        }
        // Build query string with support for array values
        if (query) {
            const usp = new URLSearchParams();
            for (const [key, val] of Object.entries(query)) {
                if (val == null) continue;
                if (Array.isArray(val)) {
                    val.forEach((v) => usp.append(key, String(v)));
                } else {
                    usp.append(key, String(val));
                }
            }
            const qs = usp.toString();
            if (qs) {
                url += (url.includes('?') ? '&' : '?') + qs;
            }
        }
        return `${this.baseURL}${url}`;
    }

    public async get<T = any>(
        endpoint: string,
        options: {
            path?: ParamsObject;
            query?: ParamsObject;
            init?: RequestInit;
            headers?: Record<string, string>;
        } = {}
    ): Promise<T> {
        const { path, query, init = {}, headers = {} } = options;
        const finalUrl = this.buildUrl(endpoint, path, query);
        const response = await fetch(finalUrl, {
            method: 'GET',
            headers: { ...this.headers, ...headers },
            ...init,
        });
        return this.responseHandler(response);
    }

    public async post<T = any>(
        endpoint: string,
        options: {
            path?: ParamsObject;
            query?: ParamsObject;
            body?: any;
            init?: RequestInit;
            headers?: Record<string, string>;
        } = {}
    ): Promise<T> {
        const { path, query, body, init = {}, headers = {} } = options;
        const finalUrl = this.buildUrl(endpoint, path, query);
        console.log('POST →', finalUrl);
        const response = await fetch(finalUrl, {
            method: 'POST',
            headers: {
                ...(!body || body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                ...this.headers,
                ...headers,
            },
            body: body instanceof FormData || body == null ? body : JSON.stringify(body),
            ...init,
        });
        return this.responseHandler(response);
    }

    public async put<T = any>(
        endpoint: string,
        options: {
            path?: ParamsObject;
            query?: ParamsObject;
            body?: any;
            init?: RequestInit;
            headers?: Record<string, string>;
        } = {}
    ): Promise<T> {
        const { path, query, body, init = {}, headers = {} } = options;
        const finalUrl = this.buildUrl(endpoint, path, query);
        console.log('PUT →', finalUrl);
        const response = await fetch(finalUrl, {
            method: 'PUT',
            headers: {
                ...(!body || body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
                ...this.headers,
                ...headers,
            },
            body: body instanceof FormData || body == null ? body : JSON.stringify(body),
            ...init,
        });
        return this.responseHandler(response);
    }

    public async delete<T = any>(
        endpoint: string,
        options: {
            path?: ParamsObject;
            query?: ParamsObject;
            init?: RequestInit;
            headers?: Record<string, string>;
        } = {}
    ): Promise<T> {
        const { path, query, init = {}, headers = {} } = options;
        const finalUrl = this.buildUrl(endpoint, path, query);
        console.log('DELETE →', finalUrl);
        const response = await fetch(finalUrl, {
            method: 'DELETE',
            headers: { ...this.headers, ...headers },
            ...init,
        });
        return this.responseHandler(response);
    }

    private async responseHandler(response: Response): Promise<any> {
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new UnauthorizedError(response);
                case 403:
                    throw new ForbiddenError(response);
                case 404:
                    throw new NotFoundError(response);
                case 500:
                    throw new ServerError(response);
                default:
                    throw new ApiError(response, 'An unexpected error occurred');
            }
        }
        return await response.json();
    }
}

export default FetchAPI;
