// src/types/request.ts

/**
 * Generic API request envelope.
 *
 * @template B  — request body 타입
 * @template Q  — query string 파라미터 타입
 * @template P  — path parameters 타입
 */
export type Request<B = undefined, Q = undefined, P = undefined> = {
    /** POST/PUT/PATCH 등 본문에 담길 데이터 */
    body?: B;
    /** URL ?a=1&b=2 형태로 들어갈 쿼리스트링 데이터 */
    query?: Q;
    /** RESTful 경로 변수 (e.g. /users/:id) */
    path?: P;
};
