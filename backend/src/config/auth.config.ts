import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  /*
    Here we can put authentication-related config values, for example:
    - jwtSecret        → secret key for signing access tokens
    - jwtExpiresIn     → access token lifetime (e.g. "3600s", "15m")
    - refreshSecret    → secret key for signing refresh tokens
    - refreshExpiresIn → refresh token lifetime (e.g. "7d")
    - oauth keys       → like Google, Facebook, GitHub client IDs/secrets
  */
}));
