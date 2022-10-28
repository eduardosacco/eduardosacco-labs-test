import handler, { getChunksOfThree, numberToWords } from './number-to-words';
import { constants as httpConstants } from 'http2';
import httpMocks from 'node-mocks-http';
import { NextApiResponse } from 'next';

describe('getChunksOfThree', () => {
  it.each([
    ['1', ['001']],
    ['12', ['012']],
    ['123', ['123']],
    ['1234', ['001', '234']],
    ['12345', ['012', '345']],
    ['123456', ['123', '456']],
    ['1234567', ['001', '234', '567']],
    ['0123456789', ['000', '123', '456', '789']],
  ])('should correctly separate %s into chunks of three', (input, expected) => {
    const chuncks = getChunksOfThree(input);
    expect(chuncks).toEqual(expected);
  });
});

describe('convertToWords', () => {
  const MAX_ALLOWED_NUMBER = 9999999999999;
  const ERROR_MAX_ALLOWED_NUMBER = `Maximum allowed number is ${MAX_ALLOWED_NUMBER}`;
  const ERROR_NOT_POSITIVE_INTEGER = 'Number must be a positive integer';

  it.each([
    ['-1', ERROR_NOT_POSITIVE_INTEGER],
    ['sdadas', ERROR_NOT_POSITIVE_INTEGER],
    ['123.32', ERROR_NOT_POSITIVE_INTEGER],
    ['123,32', ERROR_NOT_POSITIVE_INTEGER],
    ['123,320.2', ERROR_NOT_POSITIVE_INTEGER],
    [`${(+MAX_ALLOWED_NUMBER + 1).toString()}`, ERROR_MAX_ALLOWED_NUMBER],
  ])(
    'should return error when called with invalid input: %s',
    (input, expected) => {
      const result = numberToWords(input);
      expect(result.isSuccess).toBeFalsy();
      expect(result.data).toEqual(expected);
    }
  );

  it.each([
    ['0', 'zero'],
    ['3', 'three'],
    ['10', 'ten'],
    ['13', 'thirteen'],
    ['19', 'nineteen'],
    ['20', 'twenty'],
    ['33', 'thirty-three'],
    ['41', 'forty-one'],
    ['99', 'ninety-nine'],
    ['100', 'one hundred'],
    ['111', 'one hundred eleven'],
    ['157', 'one hundred fifty-seven'],
    ['1789', 'one thousand seven hundred eighty-nine'],
    ['9999', 'nine thousand nine hundred ninety-nine'],
    ['99999', 'ninety-nine thousand nine hundred ninety-nine'],
    ['999999', 'nine hundred ninety-nine thousand nine hundred ninety-nine'],
    [
      '9999999',
      'nine million nine hundred ninety-nine thousand nine hundred ninety-nine',
    ],
    [
      '49823569',
      'forty-nine million eight hundred twenty-three thousand five hundred sixty-nine',
    ],
    [
      '123456789',
      'one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine',
    ],
    [
      '9999999999',
      'nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine',
    ],
    [
      '37834267593',
      'thirty-seven billion eight hundred thirty-four million two hundred sixty-seven thousand five hundred ninety-three',
    ],
    [
      '9999999999999',
      'nine trillion nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine',
    ],
  ])('should correctly convert %s into words', (input, expected) => {
    const result = numberToWords(input);
    expect(result.isSuccess).toBeTruthy();
    expect(result.data).toEqual(expected);
  });

  it.each([
    [0, 'zero'],
    [157, 'one hundred fifty-seven'],
    [1789, 'one thousand seven hundred eighty-nine'],
    [
      9999999999999,
      'nine trillion nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine',
    ],
  ])(
    'should correctly convert %s input as number into words',
    (input, expected) => {
      const result = numberToWords(input);
      expect(result.isSuccess).toBeTruthy();
      expect(result.data).toEqual(expected);
    }
  );
});

describe('handler', () => {
  it('should return OK and data for correct input', () => {
    // Given
    const mockRequest: any = {
      query: {
        number: '10',
      },
    };
    var mockResponse = httpMocks.createResponse<NextApiResponse>();

    // When
    handler(mockRequest, mockResponse);

    // Then
    expect(mockResponse.statusCode).toBe(httpConstants.HTTP_STATUS_OK);
    expect(mockResponse._getJSONData()).toEqual({ data: 'ten' });
  });

  it('should return BAD_REQUEST and data for incorrect input', () => {
    // Given
    const mockRequest: any = {
      query: {
        number: 'hi',
      },
    };
    var mockResponse = httpMocks.createResponse<NextApiResponse>();

    // When
    handler(mockRequest, mockResponse);

    // Then
    expect(mockResponse.statusCode).toBe(httpConstants.HTTP_STATUS_BAD_REQUEST);
    expect(mockResponse._getJSONData()).toEqual({
      data: 'Number must be a positive integer',
    });
  });
});
