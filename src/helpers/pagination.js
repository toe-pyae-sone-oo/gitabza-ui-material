export const getTotalPages = ({ count, limit }) => count ? Math.ceil(count / limit) : 1

export const getOffset = ({ page, limit }) => (page - 1) * limit

export const getIndex = ({ page, limit, index }) => (page - 1) * limit + index + 1