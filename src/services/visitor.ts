'use client';
export function getOrCreateVisitorId(): string {
    if (typeof window === 'undefined' || !window.localStorage) {
        return '';
    }
    const key = 'visitor_id';
    let id = window.localStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID();
        window.localStorage.setItem(key, id);
    }
    return id;
}
