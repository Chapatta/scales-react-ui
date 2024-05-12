// src/config/index.js
import IConfig from './config/IConfig';
import configDev from './config/config.dev';
import configStaging from './config/config.staging';
import configProd from './config/config.prod';

let config: IConfig = configDev as IConfig;

if (process.env.NODE_ENV === 'production') {
  config = configProd;
} else if (process.env.NODE_ENV === 'staging') {
  config = configStaging;
} else {
  config = configDev;
}

export default config;