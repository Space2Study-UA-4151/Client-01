import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore from '~/hooks/use-load-more'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
// import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { icons } from '~/constants/categories-icons/icons'
import {
  getOpositeRole,
  getScreenBasedLimit,
  hexToRgba
} from '~/utils/helper-functions'

import { SizeEnum, SubjectInterface, CategoryInterface } from '~/types'
import { itemsLoadLimit } from '~/constants'
// import categoriesData from '~/constants/categories/categories.json'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const {
    loading: categoriesLoading,
    // response: categoriesItems,
    fetchData
  } = useCategoriesNames({
    fetchOnMount: false
  })
  // const categoriesItemsNames = categoriesItems?.map((item) => item.name)
  const categoriesItemsNames = [
    'Science, Technology',
    'Art',
    'Biology',
    'Chemistry',
    'Economics'
  ]
  const getCategoriesNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }
  const getCategories = useCallback(
    (data?: Pick<SubjectInterface, 'name'>) =>
      categoryService.getCategories(data),
    []
  )

  const {
    data: categories,
    loading: isCategoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <CardWithLink
            Icon={icons[item.appearance.icon]}
            color={item.appearance.color}
            description={`${item.totalOffers[oppositeRole]} ${t(
              'categoriesPage.offers'
            )}`}
            iconBackground={hexToRgba(item.appearance.color)}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, oppositeRole, t]
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesLoading}
          onFocus={getCategoriesNames}
          onSearchChange={resetData}
          options={categoriesItemsNames}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      {!categories.length && !isCategoriesLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={isCategoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
