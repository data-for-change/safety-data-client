import Dexie from 'dexie';

const db = new Dexie('saftyData1');
db.version(1).stores({
    injuerd: '_id, accident_id, accident_year, accident_timestamp, sex_hebrew, accident_yishuv_name ,road_type_hebrew'
});

export async function insertToDexie(data) {
    await db.injuerd.bulkPut(data);
}

export async function getFromDexie(filtername,value) {
    console.log(value)
    if (value === ``)
        var data = await db.injuerd.toArray();
    else
        var data = await db.injuerd.where(filtername).equals(value).toArray();
    return data
}

/* export async function testInsertDexie() {
    var id = await db.tasks.put({date: Date.now(), description: 'Test Dexie', done: 0});
    console.log("Got id " + id);
    // Now lets add a bunch of tasks
    await db.tasks.bulkPut([
        {date: Date.now(), description: 'Test Dexie bulkPut()', done: 1},
        {date: Date.now(), description: 'Finish testing Dexie bulkPut()', done: 1}
    ]);
} */


export default db;