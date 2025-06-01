import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DISTANCE: number;
  CHECK_DISTANCE: boolean;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASS: string;
  SUPERADMIN_EMAIL: string;
  SUPERADMIN_PASS: string;
  TOKEN: string;
  FIREBASE_SERVICE_ACCOUNT_KEY: string;
  FIREBASE_STORAGE_BUCKET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DISTANCE: joi.number().required(),
    CHECK_DISTANCE: joi.boolean().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_NAME: joi.string().required(),
    DATABASE_USERNAME: joi.string().required(),
    SUPERADMIN_EMAIL: joi.string().required(),
    SUPERADMIN_PASS: joi.string().required(),
    TOKEN: joi.string().required(),
    FIREBASE_SERVICE_ACCOUNT_KEY: joi.string().required(),
    FIREBASE_STORAGE_BUCKET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  distance: envVars.DISTANCE,
  check_distance: envVars.CHECK_DISTANCE,
  database_host: envVars.DATABASE_HOST,
  database_port: envVars.DATABASE_PORT,
  database_name: envVars.DATABASE_NAME,
  database_username: envVars.DATABASE_USERNAME,
  database_pass: envVars.DATABASE_PASS,
  superadmin_email: envVars.SUPERADMIN_EMAIL,
  superadmin_pass: envVars.SUPERADMIN_PASS,
  token: envVars.TOKEN,
  firebase_service_account_key: envVars.FIREBASE_SERVICE_ACCOUNT_KEY,
  firebase_storage_bucket: envVars.FIREBASE_STORAGE_BUCKET,
};
