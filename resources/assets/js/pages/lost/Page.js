import React from 'react'
import {Button, Container, Dimmer, Form, Grid, Header, Loader, Message, Segment, Dropdown, TextArea} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Validator} from 'ree-validate'
import Service from '../../services'
import PageHeader from '../../common/pageHeader'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import DropzoneComponent from 'react-dropzone-component'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'

class Page extends React.Component {
    constructor(props) {
        super(props);

         // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: 'api/images-save'
        };

        this.dropzone = null;

        this.validator = new Validator({
            name: 'required|min:3',
            category: '',
            description: 'required|min:30',
            reward: 'numeric|max:6',
            photo: '',
            time: '',
            date: ''
        });
        this.state = {
            
            images_value:[],

            categoryList:[],
            options: null,
            isDateOpen: '',
            isTimeOpen: '',
            startDate: moment(),
            startTime: moment(),
            item_values: {
                name: '',
                category: '',
                description: '',
                time: '',
                date: '',
                reward: '',
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errorBag
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleDate = this.toggleDate.bind(this);
        this.toggleTime = this.toggleTime.bind(this);
        this.handleFileAdded = this.handleFileAdded.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleFileAdded(file) {
        console.log("filename =" + file);
        const {images_value} = this.state;
         this.setState({
            images_value: file
        });
    }

    handlePost() {

         console.log("filename =" + this.state.images_value);
         //this.dropzone.processQueue();

         this.props.dispatch(Service.ImageUpload(this.state.images_value))
            .then((result)  => {
                this.setState({
                    isLoading: false
                });
                this.setState({
                    isSuccess: true,
                });
            })
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

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const {item_values} = this.state;
        item_values[name] = value;

        this.validator.validate(name, value)
        .then(() => {
            const {errorBag} = this.validator;
            this.setState({errors: errorBag, item_values})
        });
    }

    handleChangeDate(event) {

        const name = 'date';
        const value = event;

         console.log(name +" = " + value);

        const {item_values} = this.state;
        item_values[name] = value;


        this.setState({
            startDate: event
        });
        this.toggleDate()
    }

    handleChangeTime(event) {

        const name = 'time';
        const value = event;

         console.log(name +" = " + value);

        const {item_values} = this.state;
        item_values[name] = value;

        this.setState({
            startTime: event
        });

        this.toggleTime()
    }


    handleChangeDropDown(event, data) {

        const name = 'category';
        const value = data.value;

         console.log(name +" = " + value);

        const {item_values} = this.state;
        item_values[name] = value;

        this.validator.validate(name, value)
        .then(() => {
            const {errorBag} = this.validator;
            this.setState({errors: errorBag, item_values})
        });

    }

    toggleDate (e) {
      e && e.preventDefault()
      this.setState({isDateOpen: !this.state.isDateOpen})
    }

    toggleTime (e) {
      e && e.preventDefault()
      this.setState({isTimeOpen: !this.state.isTimeOpen})
      console.log("j'ouvre et je ferme time");
    }


    handleSubmit(event) {

        event.preventDefault();

        const {item_values} = this.state;

        console.log({item_values});

        this.validator.validateAll(item_values)
        .then(success => {
            if (success) {
                this.setState({
                    isLoading: true
                });
                this.submit(item_values);
            }
        });
    }

    submit(item_values) {
        this.props.dispatch(Service.ItemsLost(item_values))
        .then((result)  => {
            this.setState({
                isLoading: false
            });
            this.setState({
                isSuccess: true,
            });
        })
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

    componentDidMount() {
        this.setState({
            isLoading: false
        });

        this.props.dispatch(Service.GetCategory())
        .then((result)  => {
            this.setState({
                categoryList: result
            });
        })
    }

    render() {

        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.handleFileAdded,
            success: this.success,
            removedfile: this.removedfile
        }

        const {errors} = this.state;
        return (
            <div>
                <PageHeader heading="Lost"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Lost...</Loader>
                    </Dimmer>
                </Segment>

              <Container fluid>
                    <Grid>
                        <Grid.Column width={6}>
                            <Container>
                             <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                              <button onClick={this.handlePost}>Upload</button>
                            </Container>
                        </Grid.Column>
                         <Grid.Column width={10}>
                            <Container>
                                {this.state.responseError.isError && <Message negative>
                                    <Message.Content>
                                        {this.state.responseError.text}
                                    </Message.Content>
                                </Message>}
                                {this.state.isSuccess && <Message positive>
                                    <Message.Content>
                                        Registered Successfully ! <Link to='/login' replace>Login</Link> here
                                    </Message.Content>
                                </Message>}
                                <Form>
                                    <Form.Input
                                        fluid
                                        name='name'
                                        placeholder='Name'
                                        onChange={this.handleChange}
                                    />
                                    {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('name')}
                                    </Header>}
                                      <Dropdown
                                        fluid
                                        placeholder='Select Category...'
                                        className='category-dropdown'
                                        name='category'
                                        selection
                                        onChange={this.handleChangeDropDown}
                                        options={this.state.categoryList.map(({ id, name }) => ({value: id, text: name }))}
                                    />
                                    {errors.has('category') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('category')}
                                    </Header>}
                                    <TextArea
                                        className='description-textarea'
                                        name='description'
                                        placeholder='Description'
                                        onChange={this.handleChange}
                                    />
                                    {errors.has('description') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('description')}
                                    </Header>}
                                     <Grid>
                                         <Grid.Column width={8}>
                                            <span>Choose a date : </span>
                                            <button
                                                className="datepicker-button"
                                                onClick={this.toggleDate}>
                                                {this.state.startDate.format("DD-MM-YYYY")}
                                            </button>
                                            {
                                                this.state.isDateOpen && (
                                                    
                                                    <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChangeDate}
                                                        timeIntervals={5}
                                                        dateFormat="LLL"
                                                        withPortal
                                                        inline
                                                    />
                                                )
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                        <span>Choose a Time : </span>
                                            <button
                                                className="datepicker-button"
                                                onClick={this.toggleTime}>
                                                {this.state.startTime.format("HH:mm")}
                                            </button>
                                            {
                                                this.state.isTimeOpen && (
                                                    
                                                    <DatePicker
                                                        selected={this.state.startTime}
                                                        onChange={this.handleChangeTime}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeFormat="HH:mm"
                                                        timeIntervals={5}
                                                        timeCaption="Time"
                                                        withPortal
                                                        inline
                                                    />
                                                )
                                            }
                                       </Grid.Column>
                                    </Grid>
                                    <Form.Input
                                        fluid
                                        name='reward'
                                        placeholder='reward'
                                        onChange={this.handleChange}
                                    />
                                    {errors.has('reward') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('reward')}
                                    </Header>}
                                    <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Submit</Button>
                                </Form>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Page;