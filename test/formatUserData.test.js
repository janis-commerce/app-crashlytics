import { formatUserData } from "../lib/utils";

    const validParams = {
        email: 'email@email.com', 
        sub: '1231231', 
        tname: 'fizzmod', 
        locale: 'es-Es', 
        isDev: 'true', 
        tcurrency: 'AR',
        given_name: 'Dami',
        family_name: 'Morales'
    }

    const invalidParams = {invalidKey: 'invalidData'}

    const empyUserDataMock = {
        userName: '',
        userSurname: '',
        userEmail: '',
        userId: '',
        client: '',
        language: '',
        currency: '',
        isDev: ''
    }

    const validUserDataMock = {
        userName: 'Dami',
        userSurname: 'Morales',
        userEmail: 'email@email.com',
        userId: '1231231',
        client: 'fizzmod',
        language: 'es-Es',
        currency: 'AR',
        isDev: 'true'
    }

describe('formatUserData util', () => {
    it('returns empty object when is not object with keys', () => {
        const response =formatUserData('')
        expect(response).toEqual({});
    });

    it('returns formated object with empy keys when correct data is not passed', () => {
        const response =formatUserData(invalidParams)
        expect(response).toEqual(empyUserDataMock);
    });

    it('returns formated object when it has correct data', () => {
        const response =formatUserData(validParams)
        expect(response).toEqual(validUserDataMock);
    });
});