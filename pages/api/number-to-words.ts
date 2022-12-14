import type { NextApiRequest, NextApiResponse } from 'next';
import httpConstants from 'http-status';

type ConversionResult = {
  isSuccess: boolean;
  data: string;
};

export type ResponseData = {
  data: string;
};

// TODO: Would like to investigate how to add dependency injection to the handlers for more complex cases
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { number } = req.query as { number: string };
  const result = numberToWords(number);
  const statusCode = result.isSuccess
    ? httpConstants.OK
    : httpConstants.BAD_REQUEST;

  res.status(statusCode).json({ data: result.data });
}

export function numberToWords(input: string | number): ConversionResult {
  //Define number words constants
  const MAX_ALLOWED_NUMBER = 9999999999999; //This number is kind of arbitrary
  const NUMBER_ORDER = ['', '', 'thousand', 'million', 'billion', 'trillion'];
  const NUMBER_ZERO = 'zero';
  const NUMBER_FIRST_NAMED = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const NUMBER_TENS = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  // Handle input type
  let num: number;
  let numStr: string;
  if (typeof input === 'number') {
    num = input;
    numStr = input.toString();
  } else {
    numStr = input;
    num = +input;
  }

  //Validations
  if (isNaN(num) || !Number.isInteger(num) || num < 0) {
    return {
      isSuccess: false,
      data: 'Number must be a positive integer',
    };
  }

  if (num > MAX_ALLOWED_NUMBER) {
    return {
      isSuccess: false,
      data: `Maximum allowed number is ${MAX_ALLOWED_NUMBER}`,
    };
  }

  if (num === 0) {
    return { isSuccess: true, data: NUMBER_ZERO };
  }

  const chunks = getChunksOfThree(numStr);
  const order = chunks.length;
  let result = '';

  chunks.forEach((chunk, index) => {
    if (+chunk) {
      // Check if we have hundreds and add to result
      if (+chunk[0]) {
        result += NUMBER_FIRST_NAMED[+chunk.charAt(0)] + ' hundred ';
      }

      //Check if the digit at the tens position is >= 2 since the format changes
      // Depending on that add to result 
      if (+chunk[1] > 1) {
        result += NUMBER_TENS[+chunk.charAt(1)];
        if (+chunk.charAt(2)) {
          result += '-' + NUMBER_FIRST_NAMED[+chunk.charAt(2)] + ' ';
        }
      } else {
        result += NUMBER_FIRST_NAMED[+chunk.substring(1)] + ' ';
      }

      // Add the order for the current chunk to result
      result += NUMBER_ORDER[order - index] + ' ';
    }
  });

  result = result.trim();

  return { isSuccess: true, data: result };
}

export function getChunksOfThree(n: string): Array<string> {
  const totalChunks = Math.ceil(n.length / 3);
  const remainder = n.length % 3;
  const nWholeChunks = n.length / 3;
  //Init array for the totality of the chunks
  const chunks = new Array<string>(totalChunks);

  //Get the whole chunks (of 3) from right to left and assign them to their pos in the chinks array
  for (let i = 1; i <= nWholeChunks; i++) {
    const index = n.length - i * 3;
    chunks[totalChunks - i] = n.substring(index, index + 3);
  }

  // Get the last incomplete chuck (if any) and zero pad it to complete 3 digits
  if (remainder) {
    chunks[0] = n.substring(0, remainder).padStart(3, '0');
  }

  return chunks;
}
