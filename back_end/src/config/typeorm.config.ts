// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

// @Injectable()
// export class TypeOrmConfigService implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       host: this.configService.get<string>('DB_HOST'),
//       port: process.env.('DB_PORT'),
//       username: String(process.env.DB_USERNAME),
//       password: String(process.env.DB_PASSWORD),
//       database: this.configService.get<string>('DB_DATABASE'),
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       synchronize: this.configService.get<string>('DB_SYNCHRONIZE') === 'true',
//       logging: this.configService.get<string>('NODE_ENV') !== 'production',
//       migrations: [__dirname + '/../migrations/*.{js,ts}'],
//     };
//   }
// }
