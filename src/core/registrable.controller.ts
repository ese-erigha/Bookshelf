import * as express from 'express';


/**
 * Enables the auto-registration of controllers that implement this interface into index.ts
 */
export interface RegistrableController {

    register(app:express.Application): void
}