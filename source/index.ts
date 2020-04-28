#!/usr/bin/env node

/**
 *  unicorn.log
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

// For TS to stop screaming
export class Console {}

declare global {
  interface Console {
    unicorn: (error: any, len?: number) => void;
  }
}

// extends console.log
console.unicorn = function (error, len = error.toString().length * 0.66): void {
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
