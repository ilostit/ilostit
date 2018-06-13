import React from 'react';
import {
    Card,
    Image,
    Icon,
    Grid

} from 'semantic-ui-react';

class CardList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const elements = this.props.cards.map((element) => {
            return (   
              <Grid.Column key={element.id}>
                <Card fluid>
                    <Image src={element.Img} />
                    <Card.Content>
                      <Card.Header>
                        {element.Title}
                      </Card.Header>
                      <Card.Meta>
                        <span className='date'>
                          {element.Date}
                        </span>
                      </Card.Meta>
                      <Card.Description>
                        {element.Description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='map' />
                        {element.City}
                      </a>
                       <a>
                        <Icon name='gift' />
                       {element.Reward}
                      </a>

                    </Card.Content>
                </Card>
              </Grid.Column>
            )
        })
        return (
              <Grid columns={3} doubling>
                  {elements}
              </Grid>
        );
    }
}

export default CardList;