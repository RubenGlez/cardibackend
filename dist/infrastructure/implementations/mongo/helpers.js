"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryPaginated = exports.getQuerySorted = void 0;
const getQuerySorted = (query, { sort }) => {
    const querySorted = query.sort(sort);
    return querySorted;
};
exports.getQuerySorted = getQuerySorted;
const getQueryPaginated = (query, { skip, limit }) => {
    const queryPaginated = query.skip(skip).limit(limit);
    return queryPaginated;
};
exports.getQueryPaginated = getQueryPaginated;
