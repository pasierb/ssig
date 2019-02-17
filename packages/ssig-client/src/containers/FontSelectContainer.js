import { h, Component } from "preact";
import Autocomplete from "../components/Autocomplete";
import graph from "../graph";

const SEARCH_FONTS_QUERY = `
  query searchFonts($search: String) {
    fonts(search: $search) {
      family
      variants
      files
    }
  }
`;

export default class FontSelectContainer extends Component {
  state = {
    fonts: [],
    selected: undefined
  };

  handleSearch = term => {
    return graph
      .request(SEARCH_FONTS_QUERY, { search: term })
      .then(({ fonts }) => {
        this.setState({ fonts });
      });
  };

  handleChange = family => {
    this.setState(
      state => {
        const selected = state.fonts.find(font => font.family === family);

        return { selected };
      },
      () => {
        this.props.onChange(this.state.selected);
      }
    );
  };

  render(props, state) {
    return (
      <Autocomplete
        {...props}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        choices={state.fonts.map(font => font.family)}
      />
    );
  }
}
