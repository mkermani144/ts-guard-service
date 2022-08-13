import path from 'path';
import { DataSource } from "typeorm";
import { fileURLToPath } from 'url';
import { BlockEntity, migrations } from "@rosen-bridge/scanner";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const scannerOrmDataSource = new DataSource({
    type: "sqlite",
    database: __dirname + "/../sqlite/scanner.sqlite",
    entities: ['src/db/entities/*.ts', 'node_modules/@rosen-bridge/scanner/dist/entities/*.js', 'node_modules/@rosen-bridge/watcher-data-extractor/dist/entities/*.js'],
    migrations: ['src/db/migrations/*.ts'],
    synchronize: false,
    logging: false
});
