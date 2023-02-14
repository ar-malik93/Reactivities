import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'


export default function HomePage() {
    return(
        <Container>
            <h2>Home Page</h2>
            <h3>Go to the <Link to={'/activities'}>Activities</Link></h3>
        </Container>
    )
}