import * as fs from 'fs';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  privateKey: fs.readFileSync('./security/private-key.pem'),
  publicKey: fs.readFileSync('./security/public-key.pem'),
  signOptions: { expiresIn: '48h' },
};

