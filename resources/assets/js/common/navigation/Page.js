/**
 * Created by Sumit-Yadav on 06-10-2017.
 */
import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    Container,
    Dropdown,
    Divider,
    Image,
    Menu,
    Responsive,
    Segment,
    Search
} from 'semantic-ui-react';
import * as actions from '../../store/actions'


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

    }

    state = { activeItem: '' }

    handleLogout() {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { activeItem } = this.state
        this.avatar = (
            <span>
                 <Image avatar src={require('../../../images/avatar/boy.png')}
                        verticalAlign='top'/> {this.props.userName}
            </span>
        );
        return (
            <div>
                <Responsive as={Segment} maxWidth={768} className="mobile-navbar">
                    <Menu size="large" secondary>
                        <Menu.Item as={Link} to="/" className="logo" replace>
                            <img
                                src={require('../../../images/theme/infotiq-logo.png')} alt="infoTiq"/>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                <Dropdown icon="bars" className="collapsible-menu">
                                    <Dropdown.Menu className='animated'>
                                        {this.props.isAuthenticated
                                            ?
                                            <Dropdown.Item onClick={this.handleLogout} text="logout" icon='sign out'
                                                           key='logout'/>
                                            :
                                            <div>
                                                <Dropdown.Item as={NavLink} to="/login" text="login"/>
                                                <Divider/>
                                                <Dropdown.Item as={NavLink} to="/register" text="register"/>
                                            </div>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Responsive>
                <Responsive as={Menu} borderless fixed='top' style={{marginBottom: '0', borderRadius: '0', padding: '1em 0em'}} className="navbar" minWidth={769}>
                                <Menu.Item header as={NavLink} to="/" className="header-logo"><img
                                    src={require('../../../images/theme/ilostit.png')} alt="IlostIt"/>
                                </Menu.Item>
                                <Menu.Item>
                                  <Search icon='search' defaultValue='try:Brussels' />
                                </Menu.Item>
                                <Menu.Item name='Explore' icon={{ className: 'map marker' }} active={activeItem === 'Explore'} onClick={this.handleItemClick} as={NavLink} to="/Explore" />
                            <Menu.Menu position='right'>
                                <Dropdown text="Add items" icon={{ className: 'left plus circle' }} pointing className='link item'>
                                    <Dropdown.Menu className='animated'>
                                        <Dropdown.Item as={Link} to="/Lost" text="Lost"/>
                                        <Dropdown.Item as={Link} to="/Found" text="Found"/>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {this.props.isAuthenticated
                                    ? 
                                        <Dropdown trigger={this.avatar} pointing className='link item'>
                                            <Dropdown.Menu className='animated'>
                                                <Dropdown.Item as={Link} to="/" text="Manage My Profil" key='user'/>
                                                <Dropdown.Item as={Link} to="/" text="My Lost Item" key='lost'/>
                                                <Dropdown.Item as={Link} to="/" text="My Found Item" key='found'/>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={this.handleLogout} text="logout" icon='sign out' key='logout'/>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    : 
                                        <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} as={NavLink} to="/Login" />
                                }
                                {this.props.isAuthenticated
                                    ? null
                                    : <Menu.Item name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick} as={NavLink} to="/Register" />
                                 }
                            </Menu.Menu>
                </Responsive>
            </div>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;