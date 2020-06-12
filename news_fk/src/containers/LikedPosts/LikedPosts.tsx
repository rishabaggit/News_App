/* eslint-disable no-unused-vars */
import '../../components/DisplayNewsCards/DisplayNewsCards.css';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ModeColors } from 'colors';
import { RootState } from 'index';
import NewsCardDB from '../../components/DisplayNewsCards/NewsCard/NewsCardDB';
import { userget, addLike, removeLike } from '../../components/UserData/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader';

interface LikedPostsProps {
	userId: string;
	colorsObj: ModeColors;

}
interface NewsArticle {
	urlToImage: string,
	url: string,
	title: string,
	description: string
}
interface LikedPostsState {
	LikedArray: Array<NewsArticle>
}
class LikedPosts extends React.Component<LikedPostsProps, LikedPostsState>{
	componentDidMount() {
		if (this.props.userId === null) {
			return <Redirect to="/signin" />;
		}
		else {
			userget(this.props.userId)
				.then(
					doc => {
						if (doc && doc.liked) {
							this.setState({ LikedArray: doc.liked.reverse() });
						}
						else {
							this.setState({ LikedArray: [] });
						}
					}
				)
				.catch(error => console.log(error));
		}
	}
	state = {
		LikedArray: null
	}
	likePost = (newsItem: NewsArticle) => {
		let likedPosts = [newsItem, ...this.state.LikedArray];
		this.setState({ LikedArray: likedPosts });
		addLike(this.props.userId, newsItem);
	}
	unlikePost = (newsItem: NewsArticle) => {
		toast.warn('UNDO', {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			onClick: () => this.likePost(newsItem)
		});
		let likedPosts = this.state.LikedArray.filter((obj: NewsArticle) => obj.url !== newsItem.url);
		this.setState({ LikedArray: likedPosts });
		removeLike(this.props.userId, newsItem);
	}
	render() {
		if (!this.props.userId) {
			return <Redirect to="/signin" />;
		}
		if (this.state.LikedArray) {
			return (
				<div style={{ marginTop: '50px' }}>
					<ToastContainer
						position="top-center"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
					<div className="container">
						<div className="row">
							{
								this.state.LikedArray.map((newsitem: NewsArticle, idx: number) => {
									return <NewsCardDB
										img={newsitem.urlToImage}
										url={newsitem.url}
										title={newsitem.title}
										description={newsitem.description}
										key={idx}
										colorsObj={this.props.colorsObj}
										Liked={this.state.LikedArray.find((obj: NewsArticle) => obj.url === newsitem.url)}
										newsItem={newsitem}
										likePost={this.likePost}
										unlikePost={this.unlikePost}
									/>;
								})
							}
						</div>
					</div>
				</div>

			);
		}
		else {
			return <FullScreenLoader />;
		}
	}
}
const mapStateToProps = (state: RootState) => {
	return {
		userId: state.auth.userId,
		colorsObj: state.appModeReducer.colorsObj
	};
};

export default connect(mapStateToProps)(LikedPosts);
