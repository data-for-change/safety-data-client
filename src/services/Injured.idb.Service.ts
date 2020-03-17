import { openDB, deleteDB, IDBPDatabase } from 'idb';

export async function demoIDb() {
    //check for support
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    const db = await openDB('Articles', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('articles')) {
                // Create a store of objects
                console.log("createObjectStore articles");
                const store = db.createObjectStore('articles', {
                    // The 'id' property of the object will be the key.
                    keyPath: 'id',
                    // If it isn't explicitly set, create a value by auto incrementing.
                    autoIncrement: true,
                });
                // Create an index on the 'date' property of the objects.
                store.createIndex('date', 'date');
            }
        },
    });

    // Add an article:
    await db.add('articles', {
        title: 'Article 1',
        date: new Date('2019-01-01'),
        body: '…',
    });

    // Add multiple articles in one transaction:
    {
        const tx = db.transaction('articles', 'readwrite');
        tx.store.add({
            title: 'Article 2',
            date: new Date('2019-01-01'),
            body: '…',
        });
        tx.store.add({
            title: 'Article 3',
            date: new Date('2019-01-02'),
            body: '…',
        });
        await tx.done;
    }

    // Get all the articles in date order:
    console.log(await db.getAllFromIndex('articles', 'date'));

    // Add 'And, happy new year!' to all articles on 2019-01-01:
    // {
    //   const tx = db.transaction('articles', 'readwrite');
    //   const index = tx.store.index('date');

    //   for await (const cursor of index.iterate(new Date('2019-01-01'))) {
    //     const article = { ...cursor.value };
    //     article.body += ' And, happy new year!';
    //     cursor.update(article);
    //   }

    //  await tx.done;
    //}
}

const dbPromise = openDB('SaftyData', 1, {
    upgrade(db) {
        console.log("createObjectStore injuerd");
        const store = db.createObjectStore('injuerd', {
            // The '_id' property of the object will be the key.
            keyPath: '_id',
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('accident_year', 'accident_year');
        store.createIndex('injury_severity_hebrew', 'injury_severity_hebrew');
        store.createIndex('sex_hebrew', 'sex_hebrew');
    }
});

export const injuerdDb = {
    async get(key: any) {
        return (await dbPromise).get('injuerd', key);
    },
    async set(key: any, val: any) {
        return (await dbPromise).put('injuerd', val, key);
    },
    async setMulti(data: any[]) {
        return (await dbPromise)
    },
};

//////////////////////////////
export async function openDb() {
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    const db = await openDB('SaftyData', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('injuerd')) {
                // Create a store of objects
                console.log("createObjectStore injuerd");
                const store = db.createObjectStore('injuerd', {
                    // The '_id' property of the object will be the key.
                    keyPath: '_id',
                });
                // Create an index on the 'date' property of the objects.
                store.createIndex('accident_year', 'accident_year');
                store.createIndex('injury_severity_hebrew', 'injury_severity_hebrew');
                store.createIndex('sex_hebrew', 'sex_hebrew');
            }
        }
    });
    return db;
}

export async function getAll() {
}
export async function setMulti(data: any[]) {
    const db: any = await openDb();
    if (db !== undefined) {
        let tx = db.transaction('injuerd', 'readwrite')
        let store = tx.objectStore('injuerd')
        data.map((x: any) => {
           return store.put(x);
        })
        await tx.done;
        db.close()
    }
}






