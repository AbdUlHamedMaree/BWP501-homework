import { loremIpsum } from 'react-lorem-ipsum';

export const lorem = (words = 6) =>
  loremIpsum({
    p: 1,
    avgSentencesPerParagraph: 1,
    avgWordsPerSentence: words,
    random: true,
    startWithLoremIpsum: false,
  })[0];
