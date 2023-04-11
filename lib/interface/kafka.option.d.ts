import { ModuleMetadata, Type } from '@nestjs/common';
import { ClientProxy, KafkaOptions } from '@nestjs/microservices';
export declare const KAFKA_MODULE_OPTION = "KAFKA_MODULE_OPTION";
export interface KafkaModuleOption extends KafkaOptions {
}
export interface KafkaModuleOptionFactory {
    createOptions(): Promise<KafkaModuleOption> | KafkaModuleOption;
}
export interface KafkaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<KafkaModuleOptionFactory>;
    useClass?: Type<KafkaModuleOptionFactory>;
    useFactory?: (...args: any[]) => Promise<ClientProxy> | ClientProxy;
    inject?: any[];
}
