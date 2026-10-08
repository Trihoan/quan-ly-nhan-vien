    import { Global, Inject, Injectable, Module, OnModuleDestroy } from "@nestjs/common";
    import { Pool } from "pg";
    import databaseConfigs from "../../config/config.json";

    export const POSTGRES_POOL = "POSTGRES_POOL";

    const environment = process.env.NODE_ENV || "development";
    const config = databaseConfigs[environment as keyof typeof databaseConfigs] as {
        username: string;
        password: string | null;
        database: string;
        host: string;
        port?: number;
    };

    @Injectable()
    class PoolLifecycle implements OnModuleDestroy {
        constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

        async onModuleDestroy() {
            await this.pool.end();
        }
    }

    @Global()
    @Module({
        providers: [
            {
                provide: POSTGRES_POOL,
                useFactory: () =>
                    new Pool({
                        host: config.host,
                        port: config.port ?? 5432,
                        database: config.database,
                        user: config.username,
                        password: config.password ?? undefined
                    })
            },
            PoolLifecycle
        ],
        exports: [POSTGRES_POOL]
    })
    export class DatabaseModule {}
