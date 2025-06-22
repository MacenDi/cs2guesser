const title = 'CS2 Sound Guesser';

const email = 'contact@cs2soundguesser.com';

const repository = 'https://github.com/mstan/cs2guesser';

const dateFormat = 'MMMM DD, YYYY';

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cs2logo.jpg',
  description: 'CS2 Sound Guesser - Test your knowledge of Counter-Strike 2 weapon sounds! Listen to weapon sounds and guess which weapon it is.',
};

export { loader, dateFormat, repository, email, title, defaultMetaTags };
