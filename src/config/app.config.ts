import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Job Finder Portal',
  port: parseInt(process.env.APP_PORT ?? '3000', 10),
  env: process.env.NODE_ENV || 'development',
  version: process.env.APP_VERSION || '1.0.0',
}));
