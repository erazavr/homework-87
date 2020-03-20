import React, {Component} from 'react';
import {getPosts} from "../../store /actions /postsActions";
import {connect} from "react-redux";
import {Card, CardBody, CardTitle, Container} from "reactstrap";
import {NavLink} from "react-router-dom";
import PostThumbnail from "../../components /PostThumbnail/PostThumbnail";

class MainPage extends Component {
    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        const posts = this.props.posts;
        return (
            <Container>
                {posts && posts[0] ?
                posts.map(post => (
                    <Card key={post._id} className='mb-2'>
                        <CardBody>
                            <PostThumbnail image={post.image}/>
                            <CardTitle>{new Date(post.datetime).toLocaleString()} by <b>{post.user.username}</b></CardTitle>
                            <NavLink to={`/comments/${post._id}`}>{post.title}...</NavLink>
                        </CardBody>
                    </Card>
                )): <h1>No posts</h1>
                }

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    posts: state.posts.posts
});
const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);