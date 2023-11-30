import { CONSTANTS } from '../../static/constants';

export abstract class PaginationHelper {
    public static getLimit(inputLimit: number): number {
        const { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } = CONSTANTS;
        const limit = Number(inputLimit || DEFAULT_PAGE_LIMIT);
        return limit > MAX_PAGE_LIMIT ? MAX_PAGE_LIMIT : limit;
    }

    public static getOffset(limit: number, index: number): number {
        return Number((index || 0) * limit);
    }

    public static getPrismicPageFromIndex(index: number): number {
        return Number(index || 0) + 1;
    }
}
