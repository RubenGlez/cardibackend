"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromotionFilters = exports.getPaginationFilters = exports.getSortingFilters = void 0;
const DEFAULT_PER_PAGE = 50;
const DEFAULT_PAGE = 0;
const getSortingFilters = (query) => {
    const sortTerm = typeof query.sort === 'string' ? query.sort : '';
    const sort = sortTerm !== '' ? `field ${sortTerm}` : undefined;
    return {
        sort
    };
};
exports.getSortingFilters = getSortingFilters;
const getPaginationFilters = (query) => {
    const page = isNaN(Number(query.page)) ? DEFAULT_PAGE : Number(query.page);
    const perPage = isNaN(Number(query.per_page)) ? DEFAULT_PER_PAGE : Number(query.per_page);
    const limit = perPage;
    const skip = page * limit;
    return {
        limit,
        skip
    };
};
exports.getPaginationFilters = getPaginationFilters;
const getPromotionFilters = (query) => {
    const { sort } = (0, exports.getSortingFilters)(query);
    const { limit, skip } = (0, exports.getPaginationFilters)(query);
    const state = query.state === 'actived' ? 'actived' : query.state === 'expired' ? 'expired' : undefined;
    return {
        sort,
        limit,
        skip,
        state,
    };
};
exports.getPromotionFilters = getPromotionFilters;
