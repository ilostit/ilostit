import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import {
    Card,
    Image,
    Icon
} from 'semantic-ui-react';


class CardCarousel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                margin:20,
                nav:true,
                dots: false,

                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000: {
                        items: 4
                    }
                }
            },
        };
    }

    render() {
        const elements = this.props.cards.map((element) => {
            return (
                <Card fluid key={element.id}>
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
            )
        })
        return (
             <div>
                <OwlCarousel ref={inst => this.slider = inst} className="owl-theme" {...this.state.options}>
                    {elements}
                </OwlCarousel>
            </div>
        );
    }
}

export default CardCarousel;