import Dexie from 'dexie';

const db = new Dexie('saftyData');
db.version(1).stores({
    injuerd: 'id++,_id, accident_id, accident_year, accident_timestamp, sex_hebrew, accident_yishuv_name ,road_type_hebrew'
});

export async function insertToDexie(data) {
    //console.log("insertToDexie")
    //console.log(data)
    await db.injuerd.bulkPut(data);
    //testInsertDexie() 
}

export async function getFromDexie(arrFilters) {
    let data;
    if (arrFilters.length === 0)
        data = await db.injuerd.toArray();
    else {
        let years = arrFilters.shift()
        let collection = await db.injuerd.where(years.filterName).between(years.startYear, years.endYear, true, true);
        arrFilters.forEach(element => {
            collection = collection.and((function (x) {
                if (element.values.length === 1)
                    return x[element.filterName] === element.values[0];
                else {
                    let orFilter = false;
                    element.values.forEach(val => orFilter = orFilter || x[element.filterName] === val);
                    return orFilter
                }
            }))
        });
        data = await collection.toArray();
    }
    return data
}



// var db1 = new Dexie('hellodb');
// db1.version(1).stores({
//     tasks: '++id,date,description,done'
// });


// export async function testInsertDexie() {
//     var id = await db1.tasks.put({date: Date.now(), description: 'Test Dexie', done: 0});
//     console.log("Got id " + id);
//     // Now lets add a bunch of tasks
//     await db1.tasks.bulkPut([
//         {date: Date.now(), description: 'Test Dexie bulkPut()', done: 1},
//         {date: Date.now(), description: 'Finish testing Dexie bulkPut()', done: 1}
//     ]);
// } 


export default db;