export class PaginationDto {

    private constructor (public readonly page : number, public readonly limit : number, ) {}

    static create(page : number = 1, limit : number = 10) : [string?, PaginationDto?] {
        if(isNaN(page) || isNaN(limit)) return ['page and limit must be a number'];
        if(page <= 0) return ['page must be greater than zero'];
        if(limit <= 0) return ['limit must be greater than zero'];
        return [undefined, new PaginationDto(page, limit)];
    }
}