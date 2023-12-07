import { StringHelper } from "./string.helper";

describe('StringHelper', () => {
    describe('toCpfCnpj', () => {
        it('should format CPF correctly', () => {
            const cpf = '12345678909';
            const formattedCpf = StringHelper.toCpfCnpj(cpf);
            expect(formattedCpf).toBe('123.456.789-09');
        });

        it('should format CNPJ correctly', () => {
            const cnpj = '12345678000100';
            const formattedCnpj = StringHelper.toCpfCnpj(cnpj);
            expect(formattedCnpj).toBe('12.345.678/0001-00');
        });

        it('should return the input value if not a valid CPF or CNPJ', () => {
            const invalidValue = 'invalidValue';
            const result = StringHelper.toCpfCnpj(invalidValue);
            expect(result).toBe(invalidValue);
        });
    });

    describe('getOnlyNumbers', () => {
        it('should remove non-numeric characters', () => {
            const input = 'abc123def4567.89ghi';
            const result = StringHelper.getOnlyNumbers(input);
            expect(result).toBe('1234567.89');
        });
    });

    describe('isContentEmpty', () => {
        it('should return true for empty content', () => {
            const emptyContent = '';
            const result = StringHelper.isContentEmpty(emptyContent);
            expect(result).toBe(true);
        });

        it('should return true for empty HTML tags', () => {
            const emptyTags = '<div></div>';
            const result = StringHelper.isContentEmpty(emptyTags);
            expect(result).toBe(true);
        });

        it('should return false for non-empty content', () => {
            const nonEmptyContent = 'Hello, World!';
            const result = StringHelper.isContentEmpty(nonEmptyContent);
            expect(result).toBe(false);
        });
    });

    describe('normalizePrismicHtmlValue', () => {
        it('should return null for empty content', () => {
            const emptyContent = '';
            const result = StringHelper.normalizePrismicHtmlValue(emptyContent);
            expect(result).toBe(null);
        });

        it('should return the original value for non-empty content', () => {
            const nonEmptyContent = 'Hello, World!';
            const result = StringHelper.normalizePrismicHtmlValue(nonEmptyContent);
            expect(result).toBe(nonEmptyContent);
        });

        it('should return null for empty HTML tags', () => {
            const emptyTags = '<div></div>';
            const result = StringHelper.normalizePrismicHtmlValue(emptyTags);
            expect(result).toBe(null);
        });
    });
});
