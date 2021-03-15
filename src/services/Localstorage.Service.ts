export class LocalStorageService {

   static getLoaclStorage(key: string) {
      let data = localStorage.getItem(key)
      return data ? JSON.parse(data) : {}
   }

   static setLocalStorage(key: string, data: any) {
      localStorage.setItem(key, JSON.stringify(data))
   }

}