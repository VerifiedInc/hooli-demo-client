import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FCWithClassName<P = {}> = FC<P & { className?: string }>;
