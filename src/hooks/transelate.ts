import { useTranslation } from 'react-i18next';

export function useTranslate(word: string) {
   const { t } = useTranslation()
   return t(word)
}