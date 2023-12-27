import axios from "axios";
import {GET_FLIGHTS_FAIL, GET_FLIGHTS_REQUEST, GET_FLIGHTS_SUCCESS} from "../constants/flightsConstants";
import {GET_NEWS_FAIL, GET_NEWS_REQUEST, GET_NEWS_SUCCESS} from "../constants/newsConstants";

export const getNews = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_NEWS_REQUEST
        })

        const {data} = await axios.get(
            `https://newsdata.io/api/1/news?apikey=pub_35235dd9547465b91f68f7fa4d58ca37b77de&language=pl`,
        )

        dispatch({
            type: GET_NEWS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_NEWS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}