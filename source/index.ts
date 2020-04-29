/**
 *  emoji-log
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 *
 *  Art by Colin J. Randall
 *
 *               \
 *                \
 *                 \\
 *                  \\
 *                   >\/7
 *               _.-(6'  \
 *              (=___._/` \
 *                   )  \ |
 *                  /   / |
 *                 /    > /
 *                j    < _\
 *            _.-' :      ``.
 *            \ r=._\        `.
 *           <`\\_  \         .`-.
 *            \ r-7  `-. ._  ' .  `\
 *             \`,      `-.`7  7)   )
 *              \/         \|  \'  / `-._
 *                         ||    .'
 *                          \\  (
 *                           >\  >
 *                       ,.-' >.'
 *                      <.'_.''
 *                        <'
 *
 */

// For TS to stop screaming
export class CustomConsole {}

enum Constants {
  LINE_LENGTH_VARIABLE = 0.66,
  DEFAULT_LINE_LENGTH = 4.0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

declare global {
  interface Console {
    // ToDo: add correct types
    emoji: (...args: any[]) => Console;
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

function logToConsole(error: any, emoji = '🐶', length?: any): void {
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
  ${emoji} < `,
    message,
    `
      \\_${`__`.repeat(len)}_
  `
  );

  if (isError) {
    // Node.js
    if (typeof window !== 'undefined') {
      console.groupCollapsed(`${emoji} > Stack Trace:`);
      console.error(error.stack);
      console.groupEnd();
    } else {
      console.log(`${emoji} > Stack Trace:`);
      console.error(error.stack);
    }
  }
}

console.emoji = function (...args): Console {
  const log: any[] = [];

  log[0] = function (): {} {
    logToConsole('Meow', '🐱');

    return this;
  };

  log[Constants.ONE] = function (error: any): {} {
    logToConsole(error);

    return this;
  };

  log[Constants.TWO] = function (emoji: string, error: any): {} {
    logToConsole(error, emoji);

    return this;
  };

  log[Constants.THREE] = function (
    emoji: string,
    error: any,
    length: number
  ): {} {
    logToConsole(error, emoji, length);

    return this;
  };

  this.emoji = function (...passedArgs): Console {
    // call according to index
    log[passedArgs.length](...passedArgs);

    return this;
  };

  this.emoji(...args);

  return this;
};
