import type { Core } from '@strapi/strapi';
import { seedIfEmpty } from './seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started. Seeds demo content on first run.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await seedIfEmpty(strapi);
    } catch (err) {
      strapi.log.error(`[seed] Failed: ${(err as Error).message}`);
    }
  },
};
