// app/loading.tsx
'use client';

import React from 'react';
import styles from './loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner} />
        </div>
    );
}
