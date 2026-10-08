import { createRequire } from "node:module";
import { makePgService } from "postgraphile/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";

const require = createRequire(import.meta.url);
const database = require("../backend/config/config.json").development;
const connectionString = `postgresql://${encodeURIComponent(database.username)}:${encodeURIComponent(database.password)}@${database.host}:${database.port}/${encodeURIComponent(database.database)}`;

export default {
    extends: [PostGraphileAmberPreset],
    schema: {
        retryOnInitFail: true
    },
    pgServices: [
        makePgService({
            connectionString,
            schemas: ["public"]
        })
    ],
    grafserv: {
        host: "127.0.0.1",
        port: 5001,
        graphqlPath: "/graphql",
        graphiql: true,
        graphiqlPath: "/"
    }
};
