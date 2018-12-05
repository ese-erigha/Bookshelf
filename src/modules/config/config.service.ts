import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      SECRET_KEY: Joi.string().required(),
      EXPIRES_IN: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get databaseUsername(): string{
      return String(this.envConfig.DATABASE_USERNAME);
  }

  get databasePassword(): string{
    return String(this.envConfig.DATABASE_PASSWORD);
  }

  get mongoDBURI(): string{
    return `mongodb://${this.databaseUsername}:${this.databasePassword}@ds151513.mlab.com:51513/bookshelf`;
  }

  get secretKey(): string{
    return String(this.envConfig.SECRET_KEY);
  }
}