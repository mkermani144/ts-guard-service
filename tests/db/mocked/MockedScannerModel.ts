import { anything, spy, when } from "ts-mockito";
import { fileURLToPath } from "url";
import path from "path";
import { DataSource } from "typeorm";
import { dbAction, DatabaseAction } from "../../../src/db/DatabaseAction";
import { EventTrigger, PaymentTransaction } from "../../../src/models/Models";
import Utils from "../../../src/helpers/Utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: datasource config
//  fix entities directories
//  fix migrations (use package migrations)
const testScannerOrmDataSource = new DataSource({
    type: "sqlite",
    database: __dirname + "/../sqlite/test/db.sqlite",
    entities: ['src/db/entities/*.ts', 'node_modules/@rosen-bridge/scanner/dist/entities/*.js', 'node_modules/@rosen-bridge/watcher-data-extractor/dist/entities/*.js'],
    migrations: ['src/db/migrations/*.ts'],
    synchronize: false,
    logging: false
});


try {
    await testScannerOrmDataSource.initialize()
    await testScannerOrmDataSource.runMigrations()
    console.log("Test Scanner Data Source has been initialized!");
}
catch(err) {
    console.error("Error during Test Scanner Data Source initialization:", err);
}

const testScannerDataBase = new DatabaseAction(testScannerOrmDataSource)

// mock all scannerAction methods to call test database methods
const mockedScannerAction = spy(dbAction)
when(mockedScannerAction.setEventStatus(anything(), anything()))
    .thenCall(testScannerDataBase.setEventStatus)
when(mockedScannerAction.getEventById(anything()))
    .thenCall(testScannerDataBase.getEventById)
when(mockedScannerAction.getEventsByStatus(anything()))
    .thenCall(testScannerDataBase.getEventsByStatus)
when(mockedScannerAction.getActiveTransactions())
    .thenCall(testScannerDataBase.getActiveTransactions)
when(mockedScannerAction.setTxStatus(anything(), anything()))
    .thenCall(testScannerDataBase.setTxStatus)
when(mockedScannerAction.updateTxLastCheck(anything(), anything()))
    .thenCall(testScannerDataBase.updateTxLastCheck)
when(mockedScannerAction.resetEventTx(anything(), anything()))
    .thenCall(testScannerDataBase.resetEventTx)
when(mockedScannerAction.getTxById(anything()))
    .thenCall(testScannerDataBase.getTxById)
when(mockedScannerAction.updateWithSignedTx(anything(), anything()))
    .thenCall(testScannerDataBase.updateWithSignedTx)
when(mockedScannerAction.insertTx(anything()))
    .thenCall(testScannerDataBase.insertTx)
when(mockedScannerAction.getEventTxsByType(anything(), anything()))
    .thenCall(testScannerDataBase.getEventTxsByType)

/**
 * deletes every record in Event and Transaction table in ScannerDatabase
 */
const clearTables = async () => {
    await testScannerDataBase.TransactionRepository.clear()
    await testScannerDataBase.VerifiedEventRepository.clear()
}

/**
 * inserts a record to Event table in ScannerDatabase
 * @param event
 * @param status
 */
const insertEventRecord = async (event: EventTrigger, status: string) => {
    await testScannerDataBase.EventRepository.createQueryBuilder()
        .insert()
        .values({
            extractor: "extractor",
            boxId: "boxId",
            boxSerialized: "boxSerialized",
            blockId: "blockId",
            fromChain: event.fromChain,
            toChain: event.toChain,
            fromAddress: event.fromAddress,
            toAddress: event.toAddress,
            amount: event.amount,
            bridgeFee: event.bridgeFee,
            networkFee: event.networkFee,
            sourceChainTokenId: event.sourceChainTokenId,
            targetChainTokenId: event.targetChainTokenId,
            sourceTxId: event.sourceTxId,
            sourceBlockId: event.sourceBlockId,
            WIDs: event.WIDs.join(",")
        })
        .execute()
    const eventData = await testScannerDataBase.EventRepository.createQueryBuilder()
        .select()
        .where("sourceTxId = :id", {id: event.sourceTxId})
        .getOne()
    await testScannerDataBase.VerifiedEventRepository.createQueryBuilder()
        .insert()
        .values({
            id: Utils.txIdToEventId(event.sourceTxId),
            eventData: eventData!,
            status: status,
        })
        .execute()
}

/**
 * inserts a record to Event table in ScannerDatabase
 * @param paymentTx
 * @param type
 * @param chain
 * @param status
 * @param lastCheck
 * @param eventId
 */
const insertTxRecord = async (paymentTx: PaymentTransaction, type: string, chain: string, status: string, lastCheck: number, eventId: string) => {
    const event = await testScannerDataBase.VerifiedEventRepository.findOneBy({
        "id": eventId
    })
    await testScannerDataBase.TransactionRepository
        .insert({
            txId: paymentTx.txId,
            txJson: paymentTx.toJson(),
            type: type,
            chain: chain,
            status: status,
            lastCheck: lastCheck,
            event: event!
        })
}

/**
 * returns all records in Event table in ScannerDatabase
 */
const allEventRecords = async () => {
    return await testScannerDataBase.VerifiedEventRepository.createQueryBuilder().select().getMany()
}

/**
 * returns all records in Transaction table in ScannerDatabase
 */
const allTxRecords = async () => {
    return await testScannerDataBase.TransactionRepository.find({relations: ["event"]})
}

export {
    clearTables,
    insertEventRecord,
    insertTxRecord,
    allEventRecords,
    allTxRecords
}
