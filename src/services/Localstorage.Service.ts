export interface FilterLocalStorage {
   url: string
   description: string
}

export class LocalStorageService<T> {

   getLoaclStorage(key: string) {
      let data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
   }

   setLocalStorage(key: string, data: T[]) {
      localStorage.setItem(key, JSON.stringify(data))
   }

}