/* eslint-disable no-unused-vars */
// PURPOSE: Component is called in App.js and is responsible for Rendering of News Articles stored in newsarticles array

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in DisplayNewsCards.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import NewsCardDB from '../../components/DisplayNewsCards/NewsCard/NewsCardDB';
import { connect } from 'react-redux';
import '../../components/DisplayNewsCards/DisplayNewsCards.css';
import { userget, addLike, removeLike } from '../../components/UserData/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader';
import { ToastContainer, toast } from 'react-toastify';
//-----------------------------------------------------------------------------------------------------------------
class LikedPosts extends React.Component {
	componentDidMount() {
		if (this.props.userId === null) {
			return <Redirect to="/signin" />;
		}
		else {
			// console.log('CALLED', this.props.userId)
			userget(this.props.userId).then(
				doc => {
					// console.log('REACHED', doc)
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
	likePost = (newsItem) => {
		let likedPosts = [newsItem, ...this.state.LikedArray];
		this.setState({ LikedArray: likedPosts });
		addLike(this.props.userId, newsItem);
	}
	unlikePost = (newsItem) => {
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
		let likedPosts = this.state.LikedArray.filter(obj => obj.url !== newsItem.url);
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
								this.state.LikedArray.map((newsitem, idx) => {
									return <NewsCardDB
										img={newsitem.urlToImage}
										url={newsitem.url}
										title={newsitem.title}
										description={newsitem.description}
										key={idx}
										colorsObj={this.props.colorsObj}
										Liked={this.state.LikedArray.find(obj => obj.url === newsitem.url)}
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

//---------------------------------------------------------------------------------------------------------------
//Exporting as default DisplayNewsCards

const mapStateToProps = (state) => {
	return {
		userId: state.auth.userId,
		colorsObj: state.appModeReducer.colorsObj
	};
};

//mapDispatchToProps() is a utility which will help your component to fire an action event

// const mapDispatchToProps = dispatch => {
//     return {
//     }
//   };

//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, null)(LikedPosts);

//---------------------------------------------------------------------------------------------------------------