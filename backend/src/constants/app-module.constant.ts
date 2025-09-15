import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
// env
const validationSchema: ConfigModuleOptions['validationSchema'] = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  APP_NAME: Joi.string().required().default('JobSeekerPortal'),
  APP_PORT: Joi.number().port().default(3000),
  APP_PREFIX: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  MYSQL_DB_HOST: Joi.string().required(),
  MYSQL_DB_PORT: Joi.number().required(),
  MYSQL_DB_USERNAME: Joi.string().required(),
  MYSQL_DB_PASSWORD: Joi.string().allow('').optional(),
  MYSQL_DB_NAME: Joi.string().required(),
});
const validateOptions: ConfigModuleOptions['validationOptions'] = {
  allowUnknown: true,
  abortEarly: true,
};
const CONFIG_MODULE_SETTINGS: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: validationSchema as Joi.ObjectSchema,
  validationOptions: validateOptions,
  expandVariables: true, // it will allow to do this "SUPPORT_EMAIL=support@${APP_URL}" in env files
  /*  
    Loads environment variables from a file based on NODE_ENV.
    Example: if you run with "NODE_ENV=development", it will load "development.env".
    Example command: "NODE_ENV=development npm run start:dev" it will load "development.env".
    Default: ".env" file if NODE_ENV is not set.
    Make sure to create these env files (e.g., development.env, production.env) in the root directory.
  */
  envFilePath: `${process.env.NODE_ENV}.env`,

  /*
    Only put configs here that you want to be available
    everywhere in the app (global level).
    Example: app-wide settings like APP_NAME, PORT, etc.
    For module-specific configs (like database, cache, auth),
    use ConfigModule.forFeature() inside that module instead.
  */
  load: [appConfig, authConfig],
};
export { CONFIG_MODULE_SETTINGS };
