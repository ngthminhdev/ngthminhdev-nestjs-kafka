import { DynamicModule } from '@nestjs/common';
import { KafkaOptions } from '@nestjs/microservices';
import { KafkaModuleAsyncOptions } from '../interface/kafka.option';
export declare class KafkaModule {
    static register(options: KafkaOptions): DynamicModule;
    static registerAsync(options: KafkaModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
