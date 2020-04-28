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
  DEFAULT_LINE_LENGTH = 3,
}

declare global {
  interface Console {
    unicorn: (error: any, len?: number) => void;
  }
}

// extends console.log
console.unicorn = function (
  error,
  len = error?.toString().length * Constants.LINE_LENGTH_VARIABLE ||
    Constants.DEFAULT_LINE_LENGTH
): void {
  console.log(
    `
     /‾${`‾‾`.repeat(len)}‾
  🐶 < `,
    error,
    `
     \\_${`__`.repeat(len)}_
  `
  );
};
