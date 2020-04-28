#!/usr/bin/env node

/**
 *  unicorn.log
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

// For TS to stop screaming
export class Console {}

enum Constants {
  LINE_LENGTH_VARIABLE = 0.66,
  DEFAULT_LINE_LENGTH = 4.0,
}

declare global {
  interface Console {
    unicorn: (error: any, length?: number) => void;
  }
}

function instanceOfError(e: any): boolean {
  return (
    e &&
    e?.stack &&
    e?.message &&
    typeof e.stack === 'string' &&
    typeof e.message === 'string'
  );
}

// extends console.log
console.unicorn = function (error, length): void {
  // ToDo: optionally log time & date

  const isError = instanceOfError(error);
  const message = isError ? error.message : error;
  const len =
    length ||
    error?.toString().length * Constants.LINE_LENGTH_VARIABLE ||
    Constants.DEFAULT_LINE_LENGTH;

  console.log(
    `
     /‾${`‾‾`.repeat(len)}‾
  🐶 < `,
    message,
    `
     \\_${`__`.repeat(len)}_
  `
  );

  if (isError) {
    // Node.js
    if (typeof window !== 'undefined') {
      console.groupCollapsed('🐶> Stack Trace:');
      console.error(error.stack);
      console.groupEnd();
    } else {
      console.log('🐶> Stack Trace:');
      console.error(error.stack);
    }
  }
};
