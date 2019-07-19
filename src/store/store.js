import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { HTTP, unsplash } from '../config/api'
import { STATUS_CODES } from 'http';

Vue.use(Vuex, axios)

export const store = new Vuex.Store({
    state: {
        photos: [],
        defaultQuery: 'african',
        resultPerPage: 8,
        searchString: '',
        loading: true,
        noResult: false,
        error: ''
    },
    actions: {
        getPhotos({ commit }) {
            let appId = unsplash._applicationId;
            HTTP.get(`search/photos/?page=1&per_page=${this.state.resultPerPage}&query=${this.state.defaultQuery}&client_id=${appId}`)
            .then(response => {
                commit('GET_LOADING_STATUS', false);
                commit('SET_PHOTOS', response.data.results);
            })
            .catch(e => {
                console.log(e.message);
                this.errors.push(e);
            });
        },
        searchedPhotos({commit, dispatch}, payload) {
            let appId = unsplash._applicationId;
            let query = payload;
            if (query.length == '') {
                dispatch('getPhotos');
            } else {
                this.state.searchString = `"${query}"`;
                commit('GET_LOADING_STATUS', true);
                commit('SET_PHOTOS', []);
                HTTP.get(`search/photos/?page=1&per_page=${this.state.resultPerPage}&query=${query}&client_id=${appId}`).then(response => {
                    if (response.data.results.length == 0) {
                        commit('GET_SEARCH_STRING', `"${query}"`);
                        commit('GET_RESULT_STATUS', true);
                    } else {
                        commit ('GET_SEARCHED_PHOTOS', response.data.results);
                        commit('GET_RESULT_STATUS', false);
                    }
                    commit('GET_SEARCH_STRING', `"${query}"`);
                    commit('GET_LOADING_STATUS', false);
                })
                .catch(e => {
                    console.log(e.message);
                    this.errors.push(e);
                })
            }
        }
    },
    mutations: {
        SET_PHOTOS:  (state, photos) => { 
            state.photos = photos;
        },
        GET_SEARCHED_PHOTOS: (state, photos) => {
            state.photos = photos;
        },
        GET_SEARCH_STRING: (state, searchString) => {
            state.searchString = searchString;
        },
        GET_LOADING_STATUS: (state, loading) => {
            state.loading = loading;
        },
        GET_RESULT_STATUS: (state, noResult) => {
            state.noResult = noResult;
        }
    },
    getters: {
        SEARCH_STRING: state => {
            return state.searchString;
        },
        LOADING_STATUS: state => {
            return state.loading;
        },
        NO_RESULT: state => {
            return state.noResult;
        }
    }
})