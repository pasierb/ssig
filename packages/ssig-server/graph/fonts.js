const fetch = require("node-fetch");
let fontsCache;

async function fetchFontList() {
  if (fontsCache) {
    return Promise.resolve(fontsCache);
  }

  return fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${
      process.env.GOOGLE_WEB_FONTS_API_KEY
    }`
  ).then(res => {
    fontsCache = res.json();

    return fetchFontList();
  });
}

const typeSchema = `
  type Font {
    kind: String!
    family: String!
    category: String
    variants: [String]
    subsets: [String]
    version: String!
    lastModified: String!
    files: JSON
  }
`;
const querySchema = `
  fonts(search: String): [Font]
`;
const queries = {
  async fonts({ search }) {
    let { items } = await fetchFontList();

    if (search) {
      const regExp = new RegExp(search, "i");
      items = items.filter(item => item.family.match(regExp));
    }

    return items;
  }
};

module.exports = {
  typeSchema,
  querySchema,
  queries
};
