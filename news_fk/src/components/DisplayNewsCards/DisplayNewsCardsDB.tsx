/* eslint-disable no-unused-vars */
import './DisplayNewsCards.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import { ModeColors } from '../../colors'
import { userget, addLike, removeLike } from '../UserData/FirestoreUtil';
import NewsCardDev from './NewsCard/NewsCardDB';
import FullScreenLoader from '../UI/FullScreenLoader/FullScreenLoader';

interface NewsArticle {
	urlToImage: string;
	url: string;
	title: string;
	description: string;
}
interface DisplayNewsCardsProps {
	userId: string;
	colorsObj: ModeColors;
	cookies: Cookies;
	articles: Array<NewsArticle>;
}
interface DisplayNewsCardsState {
	LikedArray: Array<NewsArticle | string>;
	loading: boolean;
}

class DisplayNewsCards extends Component<DisplayNewsCardsProps, DisplayNewsCardsState> {
	componentDidMount() {
		if (this.props.userId === null || this.props.userId === '' || this.props.userId === undefined) {
			var likedPosts = (this.props.cookies).get('Like');
			if (likedPosts) {
				this.setState({
					LikedArray: likedPosts,
					loading: false
				});
			}
			else {
				this.setState({ LikedArray: [], loading: false });
			}
		}
		else {
			this.setState({ loading: true });
			userget(this.props.userId).then(
				doc => {
					if (doc && doc.liked) {
						this.setState({
							LikedArray: doc.liked,
							loading: false
						});
					}
					else {
						this.setState({ LikedArray: [], loading: false });
					}
				}
			)
				.catch(error => {
					console.log(error);
					this.setState({ LikedArray: [], loading: false });
				});
		}
	}
	state = {
		loading: true,
		LikedArray: null
	}
	likePost = (newsItem: NewsArticle) => {
		if (this.props.userId === null || this.props.userId === '' || this.props.userId === undefined) {
			(this.props.cookies).set('Like', [...(this.props.cookies).get('Like'), newsItem.url]);
			this.setState({ LikedArray: (this.props.cookies).get('Like') });
		}
		else {
			let likedPosts = [...this.state.LikedArray, newsItem];
			this.setState({ LikedArray: likedPosts });
			addLike(this.props.userId, newsItem);
		}
	}

	unlikePost = (newsItem: NewsArticle) => {
		if (this.props.userId === null || this.props.userId === '' || this.props.userId === undefined) {
			var likedPosts2 = (this.props.cookies).get('Like');
			const index = likedPosts2.indexOf(newsItem.url);
			if (index > -1) {
				likedPosts2.splice(index, 1);
			}
			(this.props.cookies).set('Like', likedPosts2);
			this.setState({ LikedArray: (this.props.cookies).get('Like') });
		}
		else {
			let likedPosts = this.state.LikedArray.filter(obj => obj.url !== newsItem.url);
			this.setState({ LikedArray: likedPosts });
			removeLike(this.props.userId, newsItem);
		}
	}
	isLiked = (newsitem: NewsArticle) => {
		if (this.props.userId === null || this.props.userId === '' || this.props.userId === undefined) {
			return this.state.LikedArray.includes(newsitem.url);
		}
		else {
			return this.state.LikedArray.find((obj: NewsArticle) => obj.url === newsitem.url);
		}

	}
	render() {
		if (this.state.loading) {
			return <FullScreenLoader />;
		}
		if (this.state.LikedArray) {
			return (
				<div className="container">
					<div className="row">
						{
							this.props.articles.map((newsitem, idx) => {
								return <NewsCardDev
									img={newsitem.urlToImage}
									url={newsitem.url}
									title={newsitem.title}
									description={newsitem.description}
									key={idx}
									colorsObj={this.props.colorsObj}
									Liked={this.isLiked(newsitem)}
									newsItem={newsitem}
									likePost={this.likePost}
									unlikePost={this.unlikePost}
								/>;
							})

						}
					</div>
				</div>

			);
		}
		else {
			return <FullScreenLoader />;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId
	};
};

export default connect(mapStateToProps)(DisplayNewsCards);
