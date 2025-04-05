// src/env.d.ts
import type { AstroLocals } from 'astro';

declare namespace App {
    interface Locals extends AstroLocals {
        greetings: string;
        token: string,
        user: UserType
    }
}