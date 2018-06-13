import React from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Responsive,
    Segment,
    Step
} from 'semantic-ui-react'
import Map from '../../elements/map/ExploreMap'
import CardList from '../../elements/CardList'

const place = [
    { id: '2', lat: '50.8504500', lng: '4.3489800', price: '40', name: 'Hotel', description: 'Hotel' }
];


const cardsListItem = [
    { id: '12', Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' },
    { id: '13', Title: 'My dog Choupi is lost', Description: 'perdu mon chien dans le parc', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { id: '14', Title: 'My Chiwawa is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_3.jpg' },
    { id: '15', Title: 'My dog Rex is lost', Description: 'perdu mon chien à Bruxelles', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' },
    { id: '16', Title: 'My dog Rex is lost', Description: 'perdu mon chien et je suis triste', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { id: '17', Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_3.jpg' },
    { id: '18', Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { id: '19', Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' }
];

class Page extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        return(
        	<div>
                <Container fluid>
                	<Grid>
                        <Grid.Column width={10}>
                        	<Container>
                                <CardList cards={cardsListItem} /> 
							</Container>
                        </Grid.Column>

                        <Grid.Column width={6}>
                        		<Map />
                        </Grid.Column>
	                </Grid>
                </Container>
            </div>
        );
    }
}

export default Page;