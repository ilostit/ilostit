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
import {Link} from 'react-router-dom'
import Service from '../../services'
import CardCarousel from '../../elements/CardCarousel'


const cardsLastLost = [
    { 'id': 1, Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' },
    { 'id': 2, Title: 'My dog Choupi is lost', Description: 'perdu mon chien dans le parc', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { 'id': 3, Title: 'My Chiwawa is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_3.jpg' },
    { 'id': 5, Title: 'My dog Rex is lost', Description: 'perdu mon chien à Bruxelles', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' },
    { 'id': 6, Title: 'My dog Rex is lost', Description: 'perdu mon chien et je suis triste', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { 'id': 7, Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_3.jpg' },
    { 'id': 8, Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_2.jpg' },
    { 'id': 9, Title: 'My dog Rex is lost', Description: 'perdu mon chien dans la rue', Category:'Dog', Date: '2018-02-25', City: 'Brussels', Reward:'30', Img:'../images/carousel_1.jpg' }
];

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      
        const social = this.props.match.params.social
        const params = this.props.location.search;

        setTimeout(function() { 

        if (params && social) {
            this.props.dispatch(Service.socialLogin({ params, social }))
                .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })
        }

        }.bind(this), 1000);
    }

    render() {

        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    className='home-header'
                    vertical
                >
                    <Container text fluid>
                        <Responsive minWidth={769}>
                            <Header
                                as="h2"
                                content="Welkom to"
                                inverted
                                className="pretitle"
                            />
                        </Responsive>
                        <Header
                            as='h1'
                            content='ILostIt'
                            inverted
                            className="main-heading"
                        />
                        <Header
                            as='p'
                            content='If u lost or found something share it that here with the community ;-)'
                            inverted
                            className="sub-heading"
                        />
                        <Button size='huge' as={Link} to="/Lost" content='I Lost Something'>
                        </Button>
                        <Button size='huge' as={Link} to="/Found" content='I Found Something'>   
                        </Button>
                    </Container>
                </Segment>
                <Container textAlign="center" style={{padding: '2em 0em'}}>
                    <Header as="h3" content="About your company"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </Container>
                <Container fluid style={{padding: '0em 2em'}}>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                               <h2> Last items lost in your area</h2>
                                <CardCarousel cards={cardsLastLost} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Page;