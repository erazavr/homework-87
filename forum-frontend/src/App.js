import React from 'react';
import Toolbar from "./components /UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import MainPage from "./containers /MainPage/MainPage";
import Register from "./containers /Register/Register";
import Login from "./containers /Login/Login";
import AddPost from "./containers /AddPost/AddPost";
import Comment from "./containers /Comment/Comment";



const App = () => {
    return (
        <>
            <header>
                <Toolbar/>
            </header>
            <Container className='mt-5'>
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/newPost' exact component={AddPost}/>
                    <Route path='/comments/:id' exact component={Comment}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                </Switch>
            </Container>
        </>
    );
};

export default App;