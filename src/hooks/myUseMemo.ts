import { useMemo } from "react";

export function useMemos(dep: any[], item: any) {

   return useMemo(() => {
      return item
   }, dep)
}