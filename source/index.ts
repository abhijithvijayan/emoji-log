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
export class Console {}

enum Constants {
  LINE_LENGTH_VARIABLE = 0.66,
  DEFAULT_LINE_LENGTH = 4.0,
}

declare global {
  interface Console {
    emoji: (error: any, length?: number) => void;
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
console.emoji = function (error, length): void {
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
  🦄 < `,
    message,
    `
      \\_${`__`.repeat(len)}_
  `
  );

  if (isError) {
    // Node.js
    if (typeof window !== 'undefined') {
      console.groupCollapsed('🦄 > Stack Trace:');
      console.error(error.stack);
      console.groupEnd();
    } else {
      console.log('🦄 > Stack Trace:');
      console.error(error.stack);
    }
  }
};
