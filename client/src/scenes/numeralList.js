import React from 'react'
import { Container, Content, Text, ListItem } from 'native-base'


// Uses the functional child pattern in react.
// Element returns a functions that takes data from the parrent
// and returns a compositional component.
const NumeralList = ({data: {loading, error, numerals}}) => {
  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error){
    return <Text>{error.message}</Text>
  }

  return (
    <Container>
      <Content>
        {numerals.map(numeral => (
          <ListItem key={ numeral.id }>
            <Text>{numeral.value}</Text>
          </ListItem>
        ))}
      </Content>
    </Container>
  )
}

export default NumeralList
