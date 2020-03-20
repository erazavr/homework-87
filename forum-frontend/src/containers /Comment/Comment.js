import React, {Component} from 'react';
import {getOnePost} from "../../store /actions /postsActions";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {getComments, sendComment} from "../../store /actions /commentsAction";

class Comment extends Component {
    state = {
        comment: ''
    };
    componentDidMount() {
        this.props.getOnePost(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }
    submitFormHandler = async event => {
        event.preventDefault();
        this.props.sendComment({...this.state, post: this.props.post[0]._id});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const post = this.props.post;
        const user = this.props.user;
        const comments = this.props.comments;
        console.log(comments);
        return (
            <>
                {post &&
                    <>
                        <h1 className='mb-3'>Post:</h1>
                        <Card className='mb-5'>
                            <CardBody>
                                <CardTitle>Username: <b>{post[0].user.username}</b></CardTitle>
                                <CardText>Title: <b>{post[0].title}</b></CardText>
                                <CardText>Time: <b>{new Date(post[0].datetime).toLocaleString()}</b></CardText>
                                <CardText>Description: <b>{post[0].description}</b></CardText>
                            </CardBody>
                        </Card>
                    </>
                }
                {comments && comments[0] ?
                    <>
                        <h1>Comments: </h1>
                        {
                            comments.map(comment => (
                                <Card key={comment._id} className='mb-2'>
                                    <CardBody>
                                        <CardTitle>Author: <b>{comment.user.username}</b></CardTitle>
                                        <CardText>Comment: <b>{comment.comment}</b></CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }

                    </>: <h1>No comments</h1>
                }
                {user &&
                    <Form onSubmit={this.submitFormHandler}>

                        <FormGroup row>
                            <Label sm={12} for="comment">Your comment</Label>
                            <Col sm={10}>
                                <Input
                                    type="textarea"
                                    name="comment" id="comment"
                                    value={this.state.comment}
                                    onChange={this.inputChangeHandler}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                                <Button color='primary' type='submit'>
                                    Send
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                }


            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    post: state.posts.posts,
    comments: state.comments.comments
});
const mapDispatchToProps = dispatch => ({
    getOnePost: id => dispatch(getOnePost(id)),
    getComments: postId => dispatch(getComments(postId)),
    sendComment: commentData => dispatch(sendComment(commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);