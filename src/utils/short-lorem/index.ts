import { loremIpsum } from 'react-lorem-ipsum';

export const shortLorem = (words = 6) =>
  loremIpsum({
    avgSentencesPerParagraph: 1,
    p: 1,
    avgWordsPerSentence: words,
    random: true,
    startWithLoremIpsum: false,
  })[0];
