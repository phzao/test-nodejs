import * as fs from 'fs';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  // privateKey: fs.readFileSync('./security/private_key.pem'),
  // publicKey: fs.readFileSync('./security/public_key.pem'),
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  signOptions: { expiresIn: '48h' },
};
