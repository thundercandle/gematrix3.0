import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import NumeralList from './numeralList'

const numeralListQuery = gql`
   query NumeralQuery {
     numerals {
       id
       value

     }
   }
 `;
const Numerals = graphql(numeralListQuery)(NumeralList);

export default Numerals
