import { Query } from 'mongoose'
import { SortingFilters, PaginationFilters } from '../../driving-adapters/api-rest/controllers/promotion/helpers'

export const getQuerySorted = <T extends Query<unknown, unknown>>(
    query: T,
    { sort }: SortingFilters
): T => {
    const querySorted = query.sort(sort)
    return querySorted
}

export const getQueryPaginated = <T extends Query<unknown, unknown>>(
    query: T,
    { skip, limit }: PaginationFilters
): T => {
    const queryPaginated = query.skip(skip).limit(limit)
    return queryPaginated
}