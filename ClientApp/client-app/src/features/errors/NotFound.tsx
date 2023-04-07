import { Link } from 'react-router-dom'
import {Button, Header, Icon, Segment} from 'semantic-ui-react'

export default function NotFound(){

    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search'></Icon>
                OOps we found nothing regading what are you looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to reactivities Page
                </Button>
            </Segment.Inline>            
        </Segment>
    )
}
