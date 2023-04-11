<!-- ## Installation

## npm

```bash
$ npm install ngthminhdev-nestjs-kafka
```

## yarn

```bash
$ yarn add ngthminhdev-nestjs-kafka
```

## Kafka Config

```ts
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
      clientId: 'clientId',
    },
    consumer: {
      groupId: 'groupId',
      allowAutoTopicCreation: true,
    },
    producer: {
      createPartitioner: Partitioners.LegacyPartitioner,
    },
  },
};
```

## App module

```ts
@Module({
  imports: [KafkaModule.register(kafkaConfig)],
  controllers: [AppController],
  providers: [AppService],
})
```

## Application main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  app.connectMicroservice(kafkaConfig);

  await app.startAllMicroservices();

  await app.listen(PORT);
}
bootstrap();
```

## App controller

```ts
import { Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { KAFKA_MODULE } from 'ngthminhdev-nestjs-kafka';

@Controller()
export class AppController {
  constructor(@Inject(KAFKA_MODULE) private readonly client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = ['request-pattern'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Post()
  async sendPattern() {
    this.client.emit<string>('request-pattern', 'some entity ' + new Date());
  }

  @EventPattern('request-pattern')
  async handleEntityCreated(payload: any) {
    console.log(JSON.stringify(payload) + ' created');
  }
}
```

## License

Nest is [MIT licensed](LICENSE). -->
