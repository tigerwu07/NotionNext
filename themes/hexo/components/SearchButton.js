import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useHexoGlobal } from '..'

/**
 * 搜索按钮
 * @returns
 */
export default function SearchButton(props) {
  const { locale } = useGlobal()
  const { searchModal } = useHexoGlobal()

  function handleSearch() {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      window.location.href = '/search'
    }
  }

  return <>
        <div onClick={handleSearch} title={locale.NAV.SEARCH} alt={locale.NAV.SEARCH} className='cursor-pointer dark:text-white hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all'>
            <i title={locale.NAV.SEARCH} className="fa-solid fa-magnifying-glass" />
        </div>
    </>
}
