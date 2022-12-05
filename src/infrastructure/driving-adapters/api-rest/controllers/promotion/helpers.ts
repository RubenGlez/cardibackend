import { Request } from 'express'

const DEFAULT_PER_PAGE = 50
const DEFAULT_PAGE = 0

export interface SortingFilters {
    sort?: string
}

export const getSortingFilters = (
    query: Request['query']
): SortingFilters => {
    const sortTerm = typeof query.sort === 'string' ? query.sort : ''
    const sort = sortTerm !== '' ? `field ${sortTerm}` : undefined
    return {
        sort
    }
}

export interface PaginationFilters {
    limit: number
    skip: number
}

export const getPaginationFilters = (
    query: Request['query']
): PaginationFilters => {
    const page = isNaN(Number(query.page)) ? DEFAULT_PAGE : Number(query.page)
    const perPage = isNaN(Number(query.per_page)) ? DEFAULT_PER_PAGE : Number(query.per_page)
    const limit = perPage
    const skip = page * limit

    return {
        limit,
        skip
    }
}


export interface PromotionFilters extends SortingFilters, PaginationFilters {
    state?: 'actived' | 'expired'
}

export const getPromotionFilters = (
    query: Request['query']
): PromotionFilters => {
    const {
        sort
    } = getSortingFilters(query)
    const {
        limit,
        skip
    } = getPaginationFilters(query)
    const state = query.state === 'actived' ? 'actived' : query.state === 'expired' ? 'expired' : undefined

    return {
        sort,
        limit,
        skip,
        state,
    }
}
