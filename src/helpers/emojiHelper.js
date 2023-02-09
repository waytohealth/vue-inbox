import emojiRegex from "emoji-regex";

export function isJustEmoji(string) {
  // regex is: (start-of-string)(1 or more emoji, spaces, or newlines)(end-of-string)
  const justEmojiRegex = new RegExp(`^((${emojiRegex().source})|[ \n])+$`)
  return justEmojiRegex.test(string);
}
