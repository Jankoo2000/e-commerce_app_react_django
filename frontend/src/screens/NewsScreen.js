import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getNews} from "../actions/newsActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {NEWS} from "../constants/flightsConstants";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";

function NewsScreen() {

    const dispatch = useDispatch();
    const newsList = useSelector(state => state.newsList)
    const {loading, status, error, news: articles} = newsList

    // const articles = news.results;
    // let articles = news.results


    useEffect(() => {
        dispatch(getNews())
    }, []);
    const renderProductLink = (content) => <Link to={productLink}>{content}</Link>;

    return (
        <div>
            <h1>Articles</h1>
            {loading ? <Loader/> :
                error ? <Message variant='danger'>{error}</Message> :
                    articles.results.map((article) => (
                        <Card className="my-3 p-3 rounded">
                            {article.image_url != null && <Card.Img
                                src={article.image_url}
                                alt={name}
                                style={{
                                    width: '900px',
                                    height: 'auto',
                                    margin: 'auto'
                                }}/>}

                            <Card.Text as="div">
                                <div className="my-3">
                                    <h2>{article.title}</h2>
                                </div>
                            </Card.Text>

                            <Card.Text as="p">{article.description}</Card.Text>

                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </Card>
                    ))
            }
        </div>
    );
}

export default NewsScreen;