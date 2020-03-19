import Dexie from 'dexie';

const db = new Dexie('saftyData1');
db.version(1).stores({
    injuerd: '_id, accident_id, accident_year, accident_timestamp, sex_hebrew, accident_yishuv_name ,road_type_hebrew'
});

export async function insertToDexie(data) {
    //console.log("insertToDexie")
    await db.injuerd.bulkPut(data);
}

export async function getFromDexie(arrFilters) {
    console.log(arrFilters)
    let data;
    if (arrFilters.length === 0)
        data = await db.injuerd.toArray();
    else
    {
        let years = arrFilters.shift()
        let collection = await db.injuerd.where('accident_year').between(years.startYear,years.endYear,true,true);
        arrFilters.forEach(element => {
            collection= collection.and((function (x) {
                if(element.values.length ===1)
                    return x[element.filterName] === element.values[0];
                else
                    {
                        let orlist = false;
                        element.values.forEach(val => orlist = orlist || x[element.filterName] === val);
                        return orlist
                    }    
            }))
        });
        data = collection.toArray();
    }
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