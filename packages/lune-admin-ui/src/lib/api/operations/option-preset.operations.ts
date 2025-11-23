import { graphql } from '../codegen';

export const COMMON_OPTION_PRESET = graphql(`
  fragment CommonOptionPreset on OptionPreset {
    id
    name
    values {
      items {
        id
        name
        metadata
      }
    }
  }
`);

export const GET_ALL_OPTION_PRESETS_QUERY = graphql(`
  query GetAllOptionPresets($input: ListInput) {
    optionPresets(input: $input) {
      items {
        ...CommonOptionPreset
      }
    }
  }
`);
